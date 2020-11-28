import { chain } from "./index";

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
