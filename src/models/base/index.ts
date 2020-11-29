import NestedError from "nested-error-stacks";
import { ResourceInfoSWR } from "../solidClient";
import { Source } from "../source";
import { canWrite } from "../accessControl/wac";

interface Base {
  error: NestedError | null;
  loading: boolean;
  solidBaseSWR: ResourceInfoSWR;
}

export function getBase(
  loading,
  error = null,
  solidBaseSWR: ResourceInfoSWR = null
): Base {
  return {
    error,
    loading,
    solidBaseSWR,
  };
}

export function getSourceAll(base: Base): Array<Source> {
  return [];
}

export function hasReadAccess(base: Base) {
  return false;
}

export function hasWriteAccess({ error, solidBaseSWR }: Base) {
  const solidBaseResourceInfo = solidBaseSWR.data;
  console.log(error, solidBaseSWR);
  return solidBaseResourceInfo ? canWrite(solidBaseResourceInfo) : false;
}
