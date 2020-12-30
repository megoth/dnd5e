import React from "react";
import { render } from "@testing-library/react";
import { createRouter } from "next/router";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import PageHeader from "./index";

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

describe("PageHeader", () => {
  // @ts-ignore
  const router = createRouter("", {}, "", {});

  it("renders", () => {
    mockAppHook(mockedAppHook);
    const { asFragment } = render(
      <RouterContext.Provider value={router}>
        <PageHeader />
      </RouterContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
