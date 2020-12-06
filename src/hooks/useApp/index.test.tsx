import React from "react";
import { render } from "@testing-library/react";
import useApp from "./index";
import AppProvider from "../../contexts/app";
import mockApp from "../../../__testUtils/mockApp";

const TESTID_BUNDLE_NAMES = "bundle-names";

function ChildComponent() {
  const app = useApp();
  return <div data-testid={TESTID_BUNDLE_NAMES}>{app.bundleNames}</div>;
}

describe("useApp", () => {
  it("returns app if available", () => {
    const app = mockApp();
    const { getByTestId } = render(
      <AppProvider app={app}>
        <ChildComponent />
      </AppProvider>
    );
    expect(getByTestId(TESTID_BUNDLE_NAMES)).toBeDefined();
  });
});
