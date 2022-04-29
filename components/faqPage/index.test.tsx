import React from "react";
import * as mockRouter from "next-router-mock";
import FAQPage, { TESTID_FAQ_ITEM } from "./index";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import mockApp from "../../__testUtils/mockApp";
import mockResourceBundleMap from "../../__testUtils/mockResourceBundleMap";
import mockFAQsDataset from "../../__testUtils/mockFAQsDataset";
import useDataset from "../../src/hooks/useDataset";
import { mockProfileDataset } from "../../__testUtils/mockProfileDataset";
import renderApp from "../../__testUtils/renderApp";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("../../src/hooks/useDataset");
const mockedUseDataset = useDataset as jest.Mock;

jest.mock("next/router", () => mockRouter);

describe("FAQPage", () => {
  beforeEach(() => mockedUseDataset.mockReturnValue(mockProfileDataset()));
  beforeEach(() => {
    mockRouter.default.setCurrentUrl(`/faq`);
  });

  it("renders a list of FAQs", () => {
    const app = mockAppHook(
      mockedAppHook,
      mockApp({
        resourceBundles: {
          ...mockResourceBundleMap({
            data: {
              faqs: mockFAQsDataset(),
            },
          }),
        },
      })
    );
    const { asFragment, queryAllByTestId } = renderApp(app, <FAQPage />);
    expect(asFragment()).toMatchSnapshot();
    expect(queryAllByTestId(TESTID_FAQ_ITEM).length).toBe(1);
  });
});
