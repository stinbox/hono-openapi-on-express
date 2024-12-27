import express from "express";

export const expressApp: express.Express = express();

expressApp.get("/api/v1/hello", (req, res) => {
  res.contentType("text/plain").send("Hello World from Express!");
});
