import { getThingAll } from "@inrupt/solid-client";
import { getTranslationId } from "../translation";
import { generateErrorUrl, getErrorId, getErrorsDataset } from "./index";
import errorTurtle from "../../../public/data/errors.ttl";
import mockAppConfig from "../../../__testUtils/mockAppConfig";

const { errorsUrl } = mockAppConfig();

describe("getErrorId", () => {
  const url = "http://example.com/test/me#more";
  it("converts a url to safe string for Fluent", () =>
    expect(getErrorId(url)).toEqual(getTranslationId(url)));
});

describe("generateErrorUrl", () => {
  it("creates an url out of an id", () =>
    expect(generateErrorUrl("test", errorsUrl)).toEqual(`${errorsUrl}#test`));
});

describe("getErrorsDataset", () => {
  it("sets a custom fetch to getSolidDataset", async () => {
    const dataset = await getErrorsDataset(errorsUrl);
    await expect(getThingAll(dataset).length).toEqual(
      errorTurtle.match(/rdfs:Literal/g)?.length
    );
  });
});
