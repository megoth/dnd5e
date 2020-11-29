import { getResourceInfo } from "@inrupt/solid-client";
import { responseInterface } from "swr";

export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export type ResourceInfo = ThenArg<ReturnType<typeof getResourceInfo>>;
export type ResourceInfoSWR = responseInterface<ResourceInfo, any>;
