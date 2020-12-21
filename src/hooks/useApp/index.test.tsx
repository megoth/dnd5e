import React from "react";
import { render } from "@testing-library/react";
import useApp from "./index";
import AppProvider from "../../contexts/app";
import mockApp, { mockUnloadedApp } from "../../../__testUtils/mockApp";
import { defaultBundle } from "../../../__testUtils/mockResourceBundle";

const TESTID_BUNDLE_NAMES = "bundle-names";

interface Props {
  bundles: string[];
}

function ChildComponent({ bundles }: Props) {
  const app = useApp(bundles.length ? bundles : undefined);
  return (
    <div data-testid={TESTID_BUNDLE_NAMES}>
      {app ? Object.keys(app.resourceBundles).join(", ") : "empty"}
    </div>
  );
}

describe("useApp", () => {
  let setBundles;
  let setLocale;

  beforeEach(() => {
    setBundles = jest.fn();
    setLocale = jest.fn();
  });

  it("returns app if available", () => {
    const app = mockApp();
    const { asFragment, getByTestId } = render(
      <AppProvider app={app} setBundles={setBundles} setLocale={setLocale}>
        <ChildComponent bundles={[]} />
      </AppProvider>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId(TESTID_BUNDLE_NAMES).innerHTML).toEqual(
      "admin-en-US, global-en-US"
    );
    expect(setBundles).not.toHaveBeenCalled();
  });

  it("returns null if app is not set", () => {
    const { getByTestId } = render(<ChildComponent bundles={[]} />);
    expect(getByTestId(TESTID_BUNDLE_NAMES).innerHTML).toEqual("empty");
    expect(setBundles).not.toHaveBeenCalled();
  });

  it("sets bundles if all other localizations are loaded", () => {
    const app = mockUnloadedApp();
    const bundles = [defaultBundle];
    render(
      <AppProvider app={app} setBundles={setBundles} setLocale={setLocale}>
        <ChildComponent bundles={bundles} />
      </AppProvider>
    );
    expect(setBundles).toHaveBeenCalledWith(bundles);
  });
});
