import "reflect-metadata";
import { MetadataKeys } from "./MetadataKeys";

export function required(...keys: string[]) {
  return function(target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.required, keys, target, key);
  };
}
