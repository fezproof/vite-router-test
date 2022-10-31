import { introspectSchema, wrapSchema } from "@graphql-tools/wrap";
import { createServer } from "@graphql-yoga/node";
import { configure } from "@vendia/serverless-express";
import { print } from "graphql";
import { rawRequest } from "graphql-request";
import type { AsyncExecutor } from "@graphql-tools/utils";
import type { SubschemaConfig } from "@graphql-tools/delegate";

const createRemoteSchema = async ({
  url,
  ...rest
}: Omit<SubschemaConfig, "schema" | "executor"> & { url: string }) => {
  const executor: AsyncExecutor = async ({ document, variables }) => {
    const query = typeof document === "string" ? document : print(document);

    return await rawRequest(url, query, variables);
  };

  const schema = wrapSchema({
    schema: await introspectSchema(executor),
    executor,
    ...rest,
  });

  return schema;
};

const app = createServer({
  schema: await createRemoteSchema({
    url: "https://swapi-graphql.netlify.app/.netlify/functions/index",
  }),
});

export const handler = configure({
  // Pass Yoga as app
  app,
  // Pass Yoga's logger to listen to the logs from Serverless Express as well
  log: app.logger,
});
