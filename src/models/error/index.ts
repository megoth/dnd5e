import { getSolidDataset } from "@inrupt/solid-client";
import { createLocalResponse } from "../../utils";
import errorTurtle from "../../../public/data/errors.ttl";
import { getTranslationId } from "../translation";

export const errorDatasetUrl = "http://localhost:3000/data/errors.ttl";

export function getErrorId(url) {
  return getTranslationId(url);
}

export function generateErrorUrl(id) {
  return `${errorDatasetUrl}#${id}`;
}

export async function getErrorsDataset() {
  return getSolidDataset(errorDatasetUrl, {
    fetch: () => Promise.resolve(createLocalResponse(errorTurtle)),
  });
}
