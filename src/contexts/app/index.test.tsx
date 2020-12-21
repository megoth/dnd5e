import React, { useContext } from "react";
import { render } from "@testing-library/react";
import AppProvider, { AppContext } from "./index";
import mockApp from "../../../__testUtils/mockApp";

const TESTID_APP_CONTEXT = "app-context";

function ChildComponent() {
  const { app, setBundles, setLocale } = useContext(AppContext);
  setBundles("setBundles");
  setLocale("setLocale");
  return (
    <div data-testid={TESTID_APP_CONTEXT}>
      {app ? app.currentLocale : "empty"}
    </div>
  );
}

describe("AppContext", () => {
  it("defaults to an empty app", () => {
    const { getByTestId } = render(<ChildComponent />);
    expect(getByTestId(TESTID_APP_CONTEXT).innerHTML).toEqual("empty");
  });

  it("allows setting properties via a provider", () => {
    const app = mockApp();
    const setBundles = jest.fn();
    const setLocale = jest.fn();
    const { getByTestId } = render(
      <AppProvider app={app} setBundles={setBundles} setLocale={setLocale}>
        <ChildComponent />
      </AppProvider>
    );
    expect(getByTestId(TESTID_APP_CONTEXT).innerHTML).toEqual(
      app.currentLocale
    );
    expect(setBundles).toHaveBeenCalledWith("setBundles");
    expect(setLocale).toHaveBeenCalledWith("setLocale");
  });
});
