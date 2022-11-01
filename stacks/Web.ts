import { StackContext, use, ViteStaticSite } from "@serverless-stack/resources";
import { Gateway } from "./Gateway";

export function Web({ stack }: StackContext) {
  const gateway = use(Gateway);

  const site = new ViteStaticSite(stack, "site", {
    path: "web",
    buildCommand: "npm run build",
    environment: {
      VITE_GRAPHQL_URL: gateway.url + "/graphql",
    },
  });

  stack.addOutputs({
    SITE_URL: site.url,
  });

  return gateway;
}
