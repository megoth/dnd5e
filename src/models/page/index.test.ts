import { getPages } from "./index";
import mockApp from "../../../__testUtils/mockApp";

const app = mockApp();

describe("getSubPages", () => {
  it("returns no pages by default", () => {
    expect(getPages("/", false, app)).toHaveLength(4);
    expect(getPages("/", true, app)).toHaveLength(5);
  });

  it("returns subpages for admin", () => {
    expect(getPages("/admin", true, app)[2].children).toHaveLength(4);
  });

  it("returns subpages for characters", () => {
    expect(getPages("/characters", true, app)[0].children).toHaveLength(2);
  });

  it("returns subpages for faq", () => {
    expect(getPages("/faq", false, app)[2].children).toHaveLength(1);
  });

  it("returns subpages for rules", () => {
    expect(getPages("/rules", false, app)[1].children).toHaveLength(5);
  });
});
