import { FluentBundle, FluentResource } from "@fluent/bundle";
import { LocalizationProvider, ReactLocalization } from "@fluent/react";
import { render } from "@testing-library/react";
import React from "react";
import {
  getTranslationId,
  getTranslationUrl,
} from "../../src/models/translation";
import Translation from "./index";

describe("Translation", () => {
  it("renders translated message", () => {
    const id = "test";
    const translationUrl = getTranslationUrl(id);
    const translationId = getTranslationId(translationUrl);
    const bundle = new FluentBundle("en-US");
    const message = `This is a test`;
    bundle.addResource(new FluentResource(`${translationId} = ${message}`));
    const l10n = new ReactLocalization([bundle]);
    const { asFragment, getByText } = render(
      <LocalizationProvider l10n={l10n}>
        <Translation id={id} />
      </LocalizationProvider>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(getByText(message)).toBeDefined();
  });
});
