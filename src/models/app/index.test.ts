import { getAppTerm } from "./index";

describe("getAppTerm", () => {
  it("generates a URL", () =>
    expect(getAppTerm("test")).toEqual(
      "https://dnd5e.inrupt.net/data/app-vocabulary.ttl#test"
    ));
});
