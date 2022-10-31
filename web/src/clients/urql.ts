import schema from "@/gql/introspection.json";
import { devtoolsExchange } from "@urql/devtools";
import { cacheExchange } from "@urql/exchange-graphcache";
import { createClient, dedupExchange, fetchExchange } from "urql";

export const client = createClient({
  url: "https://swapi-graphql.netlify.app/.netlify/functions/index",
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange({
      schema: schema as any,
      resolvers: {
        Query: {
          film: (_, args) => ({
            __typename: "Film",
            id: args.id,
          }),
        },
      },
    }),
    fetchExchange,
  ],
  requestPolicy: "cache-and-network",
});
