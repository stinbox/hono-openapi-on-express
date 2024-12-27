import { getRequestListener } from "@hono/node-server";
import express from "express";
import { honoApp } from "./hono.js";

const app = express();

app.get("/api/v1/hello", (req, res) => {
  res.send("Hello World from Express!");
});

// https://github.com/honojs/node-server/issues/55
app.use("/api/v2", getRequestListener(honoApp.fetch));

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
