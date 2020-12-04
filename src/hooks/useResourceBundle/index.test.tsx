import React from "react";
import { render } from "@testing-library/react";
import useResourceBundle from "./index";
import ResourceBundleProvider from "../../contexts/resourceBundle";
import mockResourceBundle from "../../../__testUtils/mockResourceBundle";

const TESTID_BUNDLE_NAMES = "bundle-names";

function ChildComponent() {
  const { resourceBundle } = useResourceBundle();
  return (
    <div data-testid={TESTID_BUNDLE_NAMES}>{resourceBundle.bundleNames}</div>
  );
}

describe("useResourceBundle", () => {
  it("returns resourceBundle if available", () => {
    const resourceBundle = mockResourceBundle();
    const { getByTestId } = render(
      <ResourceBundleProvider resourceBundle={resourceBundle}>
        <ChildComponent />
      </ResourceBundleProvider>
    );
    expect(getByTestId(TESTID_BUNDLE_NAMES)).toBeDefined();
  });
});
