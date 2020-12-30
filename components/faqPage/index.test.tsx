import { render } from "@testing-library/react";
import React from "react";
import { createRouter } from "next/router";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import FAQPage, { TESTID_FAQ_ITEM } from "./index";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import mockApp from "../../__testUtils/mockApp";
import mockResourceBundleMap from "../../__testUtils/mockResourceBundleMap";
import mockFAQsDataset from "../../__testUtils/mockFAQsDataset";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

describe("FAQPage", () => {
  // @ts-ignore
  const router = createRouter("", {}, "", {});

  it("renders a list of FAQs", () => {
    mockAppHook(
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
    const { asFragment, queryAllByTestId } = render(
      <RouterContext.Provider value={router}>
        <FAQPage />
      </RouterContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(queryAllByTestId(TESTID_FAQ_ITEM).length).toBe(1);
  });
});
