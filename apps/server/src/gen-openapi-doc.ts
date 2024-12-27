import fs from "fs/promises";
import { openapiHono } from "./hono.js";

const openapiDoc = openapiHono.getOpenAPIDocument({
  info: {
    title: "User API",
    version: "1.0.0",
  },
  openapi: "3.0.0",
});

await fs.writeFile("./openapi.json", JSON.stringify(openapiDoc, null, 2));
