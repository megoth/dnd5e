import React from "react";
import { render } from "@testing-library/react";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import FAQ, { TESTID_FAQ_DESCRIPTION, TESTID_FAQ_LABEL } from "./index";
import { getMessage } from "../../src/models/translation";
import mockFAQThing, {
  faqDescriptionURL,
  faqId,
  faqLabelURL,
} from "../../__testUtils/mockFAQThing";
import mockApp from "../../__testUtils/mockApp";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

describe("FAQ", () => {
  const app = mockApp();

  beforeEach(() => mockAppHook(mockedAppHook, app));

  it("renders given a FAQ", () => {
    const faq = mockFAQThing();
    const { asFragment, getByTestId } = render(<FAQ faq={faq} />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId(TESTID_FAQ_LABEL).innerHTML).toEqual(
      getMessage(app, faqLabelURL)
    );
    expect(getByTestId(TESTID_FAQ_DESCRIPTION).firstChild.textContent).toEqual(
      getMessage(app, faqDescriptionURL)
    );
  });

  it("renders given an id", () => {
    const { asFragment, getByTestId } = render(<FAQ id={faqId} />);
    expect(asFragment()).toMatchSnapshot();
    expect(getByTestId(TESTID_FAQ_LABEL).innerHTML).toEqual(
      getMessage(app, faqLabelURL)
    );
    expect(getByTestId(TESTID_FAQ_DESCRIPTION).firstChild.textContent).toEqual(
      getMessage(app, faqDescriptionURL)
    );
  });
});
