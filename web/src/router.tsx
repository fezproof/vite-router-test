import { ComponentType, createElement, lazy, Suspense } from "react";
import type {
  IndexRouteObject,
  LoaderFunction,
  NonIndexRouteObject,
  RouteObject,
} from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { createLazyElement, getDataFromPath } from "./utils/routerUtils";

type RouteImport = {
  default: ComponentType<{}>;
  loader?: LoaderFunction;
};

type RouteModule = () => Promise<RouteImport>;

const elementModules = import.meta.glob<RouteImport>("./routes/**/*.tsx");

const routeDataMap = new Map<
  string,
  {
    component: RouteModule;
    index: boolean;
    loader: LoaderFunction;
    pathParts: string[];
  }
>();

for (const key in elementModules) {
  const { path, index, pathParts } = getDataFromPath(key);

  const module = elementModules[key];

  routeDataMap.set(path, {
    index,
    pathParts,
    loader: async (...args) => module().then((mod) => mod.loader?.(...args)),
    component: module,
  });
}

const routes: RouteObject[] = [];

const rootRouteData = routeDataMap.get("index");

if (rootRouteData) {
  const Element = createLazyElement(rootRouteData.component);
  routes.push({
    path: "/",
    loader: rootRouteData.loader,
    element: (
      <Suspense>
        <Element />
      </Suspense>
    ),
  });
  routeDataMap.delete("index");
}

for (const [, { component, index, pathParts, loader }] of routeDataMap) {
  pathParts.reduce((nestedRoutes, nestedPath, i, allPaths) => {
    const branchRoute = nestedRoutes.find((route) => route.path === nestedPath);
    // Traverse tree
    if (branchRoute) {
      return branchRoute.children ?? [];
    }

    const isLeaf = i === pathParts.length - 1;

    // Create Leaf
    if (isLeaf) {
      const Element = createLazyElement(component);
      if (index) {
        const newRoute: IndexRouteObject = {
          index,
          loader,
          element: (
            <Suspense>
              <Element />
            </Suspense>
          ),
        };
        nestedRoutes.push(newRoute);

        return nestedRoutes;
      }
      const newRoute: NonIndexRouteObject = {
        path: nestedPath,
        loader,
        element: (
          <Suspense>
            <Element />
          </Suspense>
        ),
        children: [],
      };

      nestedRoutes.push(newRoute);
      return nestedRoutes;
    }

    // Create branch
    const currentPath = allPaths.slice(0, i).join("/");

    const currentRouteData = routeDataMap.get(currentPath);

    const Element = currentRouteData
      ? createLazyElement(currentRouteData.component)
      : undefined;

    const newRoute: NonIndexRouteObject = {
      path: nestedPath,
      children: [],
      loader: currentRouteData?.loader,
      element: Element && (
        <Suspense>
          <Element />
        </Suspense>
      ),
    };

    nestedRoutes.push(newRoute);

    return newRoute.children!;
  }, routes);
}

export const router = createBrowserRouter(routes);
