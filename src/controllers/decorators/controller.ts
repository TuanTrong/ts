import "reflect-metadata";
import { AppRouter } from "../../AppRouter";
import { Methods } from "./Methods";
import { MetadataKeys } from "./MetadataKeys";
import { RequestHandler, Response, NextFunction, Request } from "express";
import { badData } from "boom";

export function controller(routePrefix: string) {
  return function(target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path: string = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );
      const middlewares: RequestHandler[] =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];
      const requiredBodyProps: string[] =
        Reflect.getMetadata(MetadataKeys.required, target.prototype, key) || [];

      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          bodyValidators(requiredBodyProps),
          routeHandler
        );
      }
    }
  };
}

function bodyValidators(keys: string[]): RequestHandler {
  return function(req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.send(badData("Invalid request"));
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.send(badData(`Missing property ${key}`));
        return;
      }
    }

    next();
  };
}
