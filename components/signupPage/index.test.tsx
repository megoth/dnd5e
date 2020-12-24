import { render } from "@testing-library/react";
import React from "react";
import useApp from "../../src/hooks/useApp";
import mockApp from "../../__testUtils/mockApp";
import mockResourceBundleMap from "../../__testUtils/mockResourceBundleMap";
import mockFAQsDataset from "../../__testUtils/mockFAQsDataset";
import mockFAQThing from "../../__testUtils/mockFAQThing";
import mockAppHook from "../../__testUtils/mockAppHook";
import SignupPage from "./index";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

const app = mockApp({
  resourceBundles: mockResourceBundleMap({
    data: {
      faqs: mockFAQsDataset([
        mockFAQThing("whatIsIdP"),
        mockFAQThing("whatIsPod"),
      ]),
    },
  }),
});

describe("SignupPage", () => {
  beforeEach(() => mockAppHook(mockedAppHook, app));

  it("renders", () => {
    const { asFragment } = render(<SignupPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
