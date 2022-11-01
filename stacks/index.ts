import { App } from "@serverless-stack/resources";
import { Gateway } from "./Gateway";
import { Web } from "./Web";

export default function main(app: App) {
  app.setDefaultRemovalPolicy(app.local ? "destroy" : "retain");

  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });

  app.stack(Gateway).stack(Web);
}
