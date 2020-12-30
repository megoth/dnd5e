import { getSubPages } from "./index";

describe("getSubPages", () => {
  it("returns no pages by default", () => {
    expect(getSubPages("/")).toHaveLength(0);
  });

  it("returns pages for admin", () => {
    expect(getSubPages("/admin")).toHaveLength(5);
  });

  it("returns pages for characters", () => {
    expect(getSubPages("/characters")).toHaveLength(3);
  });

  it("returns pages for rules", () => {
    expect(getSubPages("/rules")).toHaveLength(6);
  });
});
