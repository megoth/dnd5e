import { renderHook } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
import useEscKey from "./index";

describe("useEscKey", () => {
  test("it registers the event to trigger the esc handler", () => {
    const mockedAddEventListener = jest.spyOn(
      document.body,
      "addEventListener"
    );
    jest.spyOn(document.body, "removeEventListener");

    const callback = jest.fn();
    const { unmount } = renderHook(() => useEscKey(callback));
    expect(document.body.addEventListener).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function)
    );
    userEvent.type(document.body, "{enter}");
    expect(callback).not.toHaveBeenCalled();
    userEvent.type(document.body, "{esc}");
    expect(callback).toHaveBeenCalled();

    unmount();
    const callbackFn = mockedAddEventListener.mock.calls[0][1] as Function;
    expect(document.body.removeEventListener).toHaveBeenCalledWith(
      "keydown",
      callbackFn
    );
  });
});
