import "reflect-metadata";
import { Methods } from "./Methods";
import { MetadataKeys } from "./MetadataKeys";
import { RequestHandler } from "express";

interface RouteHandlerDescriptor extends PropertyDescriptor {
  //value is the function, which is using decorator
  //It's a type check that function must has type
  //(req: Request, res: Response, next: NextFunction): any
  value?: RequestHandler;
}

function routeBinder(method: string) {
  //A decorator factory
  return function(path: string) {
    return function(target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  };
}

export const get = routeBinder(Methods.get);
export const put = routeBinder(Methods.put);
export const post = routeBinder(Methods.post);
export const del = routeBinder(Methods.delete);
export const patch = routeBinder(Methods.patch);
