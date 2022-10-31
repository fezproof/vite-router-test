import { GraphQLApi, StackContext } from "@serverless-stack/resources";
import { Api as ApiGateway } from "@serverless-stack/resources";

export function Api({ stack }: StackContext) {
  const api = new ApiGateway(stack, "api", {
    routes: {
      "ANY /graphql": "functions/graphql/graphql.handler",
    },
  });

  stack.addOutputs({
    API_URL: api.url,
  });

  return api;
}
