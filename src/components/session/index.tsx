import React from "react";
import clsx from "clsx";
import Authenticated from "../authenticated";
import Unauthenticated from "../unauthenticated";
import Translation from "../translation";
import Icon from "../icon";
import useLayout from "../../hooks/useLayout";
import useEscKey from "../../hooks/useEscKey";
import { useSolidAuth } from "@ldo/solid-react";
import { bem } from "../../utils/bem";

export const SESSION_CLOSE_BUTTON = "session-close-button";

export default function Session() {
  const { session } = useSolidAuth();
  const { full, setRightOpen } = useLayout();

  useEscKey(() => setRightOpen(false));

  return (
    <div>
      <button
        type="button"
        className={clsx(
          bem("button", "close"),
          bem("layout__close-button", "right", {
            content: !full,
            full,
          }),
          "text-left",
        )}
        onClick={() => setRightOpen(false)}
        data-testid={SESSION_CLOSE_BUTTON}
      >
        <Icon name="close" />
        &nbsp;
        <Translation id="close" />
      </button>
      <div
        className={clsx("px-2", {
          "xl:px-0": !full,
        })}
      >
        {session.isLoggedIn ? <Authenticated /> : <Unauthenticated />}
      </div>
    </div>
  );
}
