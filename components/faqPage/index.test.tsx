import { render } from "@testing-library/react";
import React from "react";
import {
  mockSolidDatasetFrom,
  mockThingFrom,
  setThing,
  setUrl,
} from "@inrupt/solid-client";
import { rdf } from "rdf-namespaces";
import FAQPage, { TESTID_FAQ_ITEM } from "./index";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import mockApp, { faqsURL } from "../../__testUtils/mockApp";
import { chain } from "../../src/utils";
import { getAppTerm } from "../../src/models/appIndex";
import { appVocabURL } from "../../__testUtils/mockAppIndexDataset";
import mockResourceBundleMap from "../../__testUtils/mockResourceBundleMap";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

describe("FAQPage", () => {
  it("renders a list of FAQs", () => {
    const faqURL = "https://example.com/#faq";
    const faqLabelURL = "https://example.com/#faqLabel";
    const faqDescriptionURL = "https://example.com/#faqDescription";
    mockAppHook(
      mockedAppHook,
      mockApp({
        resourceBundles: {
          ...mockResourceBundleMap({
            data: {
              faqs: chain(mockSolidDatasetFrom(faqsURL), (d) =>
                setThing(
                  d,
                  chain(
                    mockThingFrom(faqURL),
                    (t) =>
                      setUrl(t, rdf.type, getAppTerm("FAQ", { appVocabURL })),
                    (t) =>
                      setUrl(
                        t,
                        getAppTerm("faqLabel", { appVocabURL }),
                        faqLabelURL
                      ),
                    (t) =>
                      setUrl(
                        t,
                        getAppTerm("faqDescription", { appVocabURL }),
                        faqDescriptionURL
                      )
                  )
                )
              ),
            },
          }),
        },
      })
    );
    const { asFragment, queryAllByTestId } = render(<FAQPage />);
    expect(asFragment()).toMatchSnapshot();
    expect(queryAllByTestId(TESTID_FAQ_ITEM).length).toBe(1);
  });
});
