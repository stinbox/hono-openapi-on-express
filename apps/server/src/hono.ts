import { Hono } from "hono";

export const honoApp = new Hono().get("/hello", (c) => {
  return c.text("Hello World from Hono!");
});
