import { ResourceInfo } from "../../solidClient";

export function canRead(resourceInfo: ResourceInfo) {
  return false;
}

export function canWrite(resourceInfo: ResourceInfo): boolean {
  console.log({ resourceInfo });
  return false;
}
