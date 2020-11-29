import { chain, createLocalResponse } from "./index";

describe("chain", () => {
  test("it reduces an arbitrary list of functions, accumulating each operation's return product", () => {
    const opOne = jest.fn((x) => [x, "one"].join(":"));
    const opTwo = jest.fn((x) => [x, "two"].join(":"));
    const value = chain("x", opOne, opTwo);

    expect(opOne).toHaveBeenCalledWith("x");
    expect(opTwo).toHaveBeenCalledWith("x:one");
    expect(value).toEqual("x:one:two");
  });
});

describe("createLocalResponse", () => {
  it("creates a Response object", async () => {
    const response = createLocalResponse("test");
    expect(response.headers.get("Content-Type")).toEqual("text/turtle");
    await expect(response.text()).resolves.toEqual("test");
  });
});
