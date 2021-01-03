import { getPages } from "./index";

describe("getSubPages", () => {
  it("returns no pages by default", () => {
    expect(getPages("/", false)).toHaveLength(4);
    expect(getPages("/", true)).toHaveLength(5);
  });

  it("returns pages for admin", () => {
    expect(getPages("/admin", true)[2].children).toHaveLength(4);
  });

  it("returns pages for characters", () => {
    expect(getPages("/characters", true)[0].children).toHaveLength(2);
  });

  it("returns pages for rules", () => {
    expect(getPages("/rules", false)[1].children).toHaveLength(5);
  });
});
