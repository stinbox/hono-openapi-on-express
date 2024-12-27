import { getAPIv2Client } from "server/client";

const client = getAPIv2Client("http://localhost:3000/api/v2");

export default async function Home() {
  const response = await client.organizations
    .$get({ query: {} })
    .then((res) => res.json());

  return <pre>{JSON.stringify(response, null, 2)}</pre>;
}
