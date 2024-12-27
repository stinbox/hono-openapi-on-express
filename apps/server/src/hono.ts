import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";

const OrganizationIdSchema = z.coerce
  .number()
  .int()
  .positive()
  .openapi("OrganizationId", { example: 1234 });

const UserIdSchema = z.string().openapi("UserId", { example: "abcde" });

const ListQuerySchema = z
  .object({
    limit: z.number().int().positive().optional().openapi({
      example: 10,
    }),
    offset: z.number().int().positive().optional().openapi({
      example: 0,
    }),
  })
  .openapi("ListQuery");

const OrganizationSchema = z
  .object({
    id: OrganizationIdSchema,
    name: z.string().openapi({
      example: "chot-inc",
    }),
    displayName: z.string().optional().openapi({
      example: "chot Inc.",
    }),
  })
  .openapi("Organization");

const UserSchema = z
  .object({
    id: UserIdSchema,
    name: z.string().openapi({
      example: "John Doe",
    }),
    age: z.number().openapi({
      example: 42,
    }),
    nickname: z.string().optional().openapi({
      example: "JD",
    }),
  })
  .openapi("User");

const getOrganizationsRoute = createRoute({
  method: "get",
  path: "/organizations",
  request: {
    query: ListQuerySchema,
  },
  responses: {
    200: {
      description: "List of Organizations",
      content: {
        "application/json": {
          schema: z.array(OrganizationSchema),
        },
      },
    },
  },
});

const postOrganizationsRoute = createRoute({
  method: "post",
  path: "/organizations",
  description: "Create new Organization",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            name: z.string().openapi({
              example: "chot-inc",
            }),
            displayName: z.string().optional().openapi({
              example: "chot Inc.",
            }),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Created Organization",
      content: {
        "application/json": {
          schema: OrganizationSchema,
        },
      },
    },
  },
});

const getOrganizationRoute = createRoute({
  method: "get",
  path: "/organizations/{id}",
  request: {
    params: z.object({
      id: OrganizationIdSchema,
    }),
  },
  responses: {
    200: {
      description: "get Organization",
      content: {
        "application/json": {
          schema: OrganizationSchema,
        },
      },
    },
  },
});

const putOrganizationRoute = createRoute({
  method: "put",
  path: "/organizations/{id}",
  request: {
    params: z.object({
      id: OrganizationIdSchema,
    }),
    body: {
      content: {
        "application/json": {
          schema: z.object({
            displayName: z.string().optional().openapi({
              example: "chot Inc.",
            }),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Updated Organization",
      content: {
        "application/json": {
          schema: OrganizationSchema,
        },
      },
    },
  },
});

const getOrganizationUsersRoute = createRoute({
  method: "get",
  path: "/organizations/{id}/users",
  request: {
    params: z.object({
      id: OrganizationIdSchema,
    }),
    query: ListQuerySchema,
  },
  responses: {
    200: {
      description: "List of Users",
      content: {
        "application/json": {
          schema: z.array(UserSchema),
        },
      },
    },
  },
});

const getUserinfoRoute = createRoute({
  method: "get",
  path: "/userinfo",
  responses: {
    200: {
      description: "User Info",
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
    },
  },
});

export const honoApp = new OpenAPIHono()

  .openapi(getOrganizationsRoute, async (c) => {
    return c.json([
      {
        id: 1234,
        name: "chot-inc",
        displayName: "chot Inc.",
      },
      {
        id: 5678,
        name: "vercel",
        displayName: "Vercel Inc.",
      },
    ]);
  })

  .openapi(postOrganizationsRoute, async (c) => {
    const id = Math.floor(Math.random() * 10000);
    return c.json({
      id: id,
      name: "chot-inc",
      displayName: "chot Inc.",
    });
  })

  .openapi(getOrganizationRoute, async (c) => {
    return c.json({
      id: c.req.valid("param").id,
      name: "chot-inc",
      displayName: "chot Inc.",
    });
  })

  .openapi(putOrganizationRoute, async (c) => {
    return c.json({
      id: c.req.valid("param").id,
      name: "chot-inc",
      displayName: "chot Inc.",
    });
  })

  .openapi(getOrganizationUsersRoute, async (c) => {
    return c.json([
      {
        id: "abcde",
        name: "John Doe",
        age: 42,
        nickname: "JD",
      },
      {
        id: "fghij",
        name: "Jane Doe",
        age: 39,
        nickname: "JJ",
      },
    ]);
  })

  .openapi(getUserinfoRoute, async (c) => {
    return c.json({
      id: "abcde",
      name: "John Doe",
      age: 42,
      nickname: "JD",
    });
  })

  .doc("/openapi", {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
    },
  });

honoApp.get(
  "/docs",
  apiReference({
    theme: "default",
    hideClientButton: true,
    spec: {
      url: "/api/v2/openapi",
    },
  }),
);
