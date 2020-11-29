import { getSolidDataset } from "@inrupt/solid-client";
import { createLocalResponse } from "../../utils";
import errorTurtle from "../../../public/data/errors.ttl";
import { getTranslationId } from "../translation";

export function getErrorId(url) {
  return getTranslationId(url);
}

export function generateErrorUrl(id, datasetUrl) {
  return `${datasetUrl}#${id}`;
}

export async function getErrorsDataset(datasetUrl) {
  return getSolidDataset(datasetUrl, {
    fetch: () => Promise.resolve(createLocalResponse(errorTurtle)),
  });
}
