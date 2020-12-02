import React from "react";
import { render } from "@testing-library/react";
import useAppConfig from "./index";
import mockAppConfig from "../../../__testUtils/mockAppConfig";
import AppConfigProvider from "../../contexts/appConfig";

const TESTID_SOLID_BASE = "solid-base";
const appConfig = mockAppConfig();

function ChildComponent() {
  const { solidBase } = useAppConfig();
  return <div data-testid={TESTID_SOLID_BASE}>{solidBase}</div>;
}

describe("useAppConfig", () => {
  it("returns the values in App Config Context", () => {
    const { getByTestId } = render(
      <AppConfigProvider solidBase={appConfig.solidBase}>
        <ChildComponent />
      </AppConfigProvider>
    );
    expect(getByTestId(TESTID_SOLID_BASE).innerHTML).toEqual(
      appConfig.solidBase
    );
  });
});
