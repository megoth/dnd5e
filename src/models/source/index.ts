import NestedError from "nested-error-stacks";
import { ResourceInfoSWR } from "../solidClient";

export interface Source {
  error: NestedError;
  loading: boolean;
  sourceSWR: ResourceInfoSWR;
  url: string;
}
