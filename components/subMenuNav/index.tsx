import React from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useSession } from "@inrupt/solid-ui-react";
import NavItem from "../navItem";
import { bem } from "../../src/utils";
import { getPages } from "../../src/models/page";
import useLayout from "../../src/hooks/useLayout";
import Translation from "../translation";
import Icon from "../icon";
import useEscKey from "../../src/hooks/useEscKey";
import { userIsAdmin } from "../../src/models/session";
import useApp from "../../src/hooks/useApp";

export const TESTID_SUB_MENU_NAV_CLOSE_BUTTON = "sub-menu-nav-close-button";

export default function SubMenuNav() {
  const { full, setLeftOpen } = useLayout();
  const { session } = useSession();
  const app = useApp();

  useEscKey(() => setLeftOpen(false));

  const { asPath } = useRouter();
  const pages = getPages(asPath, userIsAdmin(session), app);
  return (
    <>
      <button
        type="button"
        className={clsx(
          bem("button", "close"),
          bem("layout__close-button", "left", {
            content: !full,
            full,
          }),
          "text-right"
        )}
        onClick={() => setLeftOpen(false)}
        data-testid={TESTID_SUB_MENU_NAV_CLOSE_BUTTON}
      >
        <Icon name="close" />
        &nbsp;
        <Translation id="close" />
      </button>
      <nav className={clsx(bem("pages-nav", "sub-menu"))}>
        <ul className={bem("nav-pages__list", "sub-menu")}>
          {pages.map((page) => (
            <NavItem key={page.href} {...page} />
          ))}
        </ul>
      </nav>
    </>
  );
}
