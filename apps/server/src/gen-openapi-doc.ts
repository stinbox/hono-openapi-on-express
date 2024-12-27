import fs from "fs/promises";
import { honoApp } from "./hono.js";

const openapiDoc = honoApp.getOpenAPIDocument({
  info: {
    title: "User API",
    version: "1.0.0",
  },
  openapi: "3.0.0",
});

await fs.writeFile("./openapi.json", JSON.stringify(openapiDoc, null, 2));
