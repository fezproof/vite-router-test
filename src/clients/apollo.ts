import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          film: {
            read(_, { args, toReference }) {
              return toReference({
                __typename: "Book",
                id: args?.id as string,
              });
            },
          },
        },
      },
    },
  }),
  connectToDevTools: true,
});
