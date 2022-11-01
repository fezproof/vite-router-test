import { ComponentType, lazy } from "react";

const INDEX_PATH = "index";

export const getDataFromPath = (rawPath: string) => {
  const path = rawPath
    .replace("./routes/", "")
    .replace("$.tsx", "*")
    .replace(".tsx", "")
    .replace(/\$/, ":");

  const pathParts = path.split("/");

  const index = pathParts.at(-1) === INDEX_PATH;
  const parentPath = pathParts.slice(0, pathParts.length - 1).join("/");

  return { path, index, parentPath, pathParts };
};

export const createLazyElement = (
  component: () => Promise<{ default: ComponentType }>
) => {
  const Element = lazy(component);

  return Element;
};
