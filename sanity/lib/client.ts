import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId, token, useCdn } from "../env";

const client = createClient({
  projectId,
  dataset,
  useCdn,
  apiVersion,
  token,
});

export default client;
