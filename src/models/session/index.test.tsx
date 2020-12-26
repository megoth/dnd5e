import mockApp from "../../../__testUtils/mockApp";
import { onIdPSelected } from "./index";

describe("onIdPSelected", () => {
  const app = mockApp();
  const oidcIssuer = "http://example.com";

  it("logs in via the provided login function", async () => {
    const login = jest.fn();
    await expect(
      onIdPSelected(app, oidcIssuer, login, () => {})
    ).resolves.toBeUndefined();
    expect(login).toHaveBeenCalledWith({
      clientName: "Test App",
      oidcIssuer,
      redirectUrl: "http://localhost/",
    });
  });

  it("delegates errors via the provided onError function", async () => {
    const error = new Error();
    const login = jest.fn().mockImplementation(() => {
      throw error;
    });
    const onError = jest.fn();
    await expect(
      onIdPSelected(app, oidcIssuer, login, onError)
    ).resolves.toBeUndefined();
    expect(onError).toHaveBeenCalledWith(error);
  });
});
