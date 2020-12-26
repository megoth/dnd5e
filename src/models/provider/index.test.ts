import { getProviders } from "./index";

describe("getProviders", () => {
  it("returns a list with info about IdPs", () => {
    expect(getProviders()).toMatchSnapshot();
  });
});
