import { hc } from "hono/client";
import { honoApp } from "./hono.js";

const client = hc<typeof honoApp>("");
export type Client = typeof client;

export const getAPIv2Client = (...args: Parameters<typeof hc>): Client =>
  hc<typeof honoApp>(...args);
