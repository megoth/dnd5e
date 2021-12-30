import React from "react";
import * as solidUIReactFns from "@inrupt/solid-ui-react";
import * as routerFns from "next/router";
import userEvent from "@testing-library/user-event";
import Session, { SESSION_CLOSE_BUTTON } from "./index";
import { mockUnauthenticatedSession } from "../../__testUtils/mockSession";
import { mockProfileDataset } from "../../__testUtils/mockProfileDataset";
import useDataset from "../../src/hooks/useDataset";
import useApp from "../../src/hooks/useApp";
import mockAppHook from "../../__testUtils/mockAppHook";
import useLayout from "../../src/hooks/useLayout";
import mockRouter from "../../__testUtils/mockRouter";
import renderApp from "../../__testUtils/renderApp";

jest.mock("../../src/hooks/useDataset");
const mockedUseDataset = useDataset as jest.Mock;

jest.mock("../../src/hooks/useApp");
const mockedAppHook = useApp as jest.Mock;

jest.mock("../../src/hooks/useLayout");
const mockedLayoutHook = useLayout as jest.Mock;

describe("Session", () => {
  let app;
  let setRightOpen;

  beforeEach(() => {
    app = mockAppHook(mockedAppHook);
  });
  beforeEach(() => {
    jest
      .spyOn(routerFns, "useRouter")
      .mockReturnValue(mockRouter({ asPath: "/" }));
  });
  beforeEach(() => {
    setRightOpen = jest.fn();
    mockedLayoutHook.mockReturnValue({ setRightOpen });
  });
  beforeEach(() => mockedUseDataset.mockReturnValue(mockProfileDataset()));

  it("renders for authenticated state", () => {
    const { asFragment } = renderApp(app, <Session />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders for unauthenticated state", () => {
    jest
      .spyOn(solidUIReactFns, "useSession")
      .mockImplementation(() => mockUnauthenticatedSession());
    const { asFragment } = renderApp(app, <Session />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders a button that closes menu", () => {
    const { getByTestId } = renderApp(app, <Session />);
    userEvent.click(getByTestId(SESSION_CLOSE_BUTTON));
    expect(setRightOpen).toHaveBeenCalledWith(false);
  });

  it("adds an event listener to escape key", () => {
    const { getByTestId } = renderApp(app, <Session />);
    userEvent.type(getByTestId(SESSION_CLOSE_BUTTON), "{esc}");
    expect(setRightOpen).toHaveBeenCalledWith(false);
  });
});
