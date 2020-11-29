import { getThingAll } from "@inrupt/solid-client";
import { getTranslationId } from "../translation";
import {
  errorDatasetUrl,
  generateErrorUrl,
  getErrorId,
  getErrorsDataset,
} from "./index";
import errorTurtle from "../../../data/errors.ttl";

describe("getErrorId", () => {
  const url = "http://example.com/test/me#more";
  it("converts a url to safe string for Fluent", () =>
    expect(getErrorId(url)).toEqual(getTranslationId(url)));
});

describe("generateErrorUrl", () => {
  it("creates an url out of an id", () =>
    expect(generateErrorUrl("test")).toEqual(`${errorDatasetUrl}#test`));
});

describe("getErrorsDataset", () => {
  it("sets a custom fetch to getSolidDataset", async () => {
    const dataset = await getErrorsDataset();
    await expect(getThingAll(dataset).length).toEqual(
      errorTurtle.match(/rdfs:Literal/g)?.length
    );
  });
});
