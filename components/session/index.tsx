import React from "react";
import { useSession } from "@inrupt/solid-ui-react";
import clsx from "clsx";
import Authenticated from "../authenticated";
import Unauthenticated from "../unauthenticated";
import Translation from "../translation";
import Icon from "../icon";
import useLayout from "../../src/hooks/useLayout";
import useEscKey from "../../src/hooks/useEscKey";
import { bem } from "../../src/utils";

export const SESSION_CLOSE_BUTTON = "session-close-button";

export default function Session() {
  const { session } = useSession();
  const { setRightOpen } = useLayout();

  useEscKey(() => setRightOpen(false));

  return (
    <div>
      <button
        type="button"
        className={clsx(bem("button", "close"), "text-left")}
        onClick={() => setRightOpen(false)}
        data-testid={SESSION_CLOSE_BUTTON}
      >
        <Icon name="close" />
        &nbsp;
        <Translation id="close" />
      </button>
      {session.info.isLoggedIn ? <Authenticated /> : <Unauthenticated />}
    </div>
  );
}
