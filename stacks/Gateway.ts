import { Api as ApiGateway, StackContext } from "@serverless-stack/resources";

export function Gateway({ stack }: StackContext) {
  const gatewayApi = new ApiGateway(stack, "gateway", {
    routes: {
      "ANY /graphql": "gateway/src/graphql.handler",
    },
  });

  stack.addOutputs({
    GATEWAY_URL: gatewayApi.url,
  });

  return gatewayApi;
}
