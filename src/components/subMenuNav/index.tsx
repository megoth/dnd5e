import React from "react";
import clsx from "clsx";
import NavItem from "../navItem";
import { getPages } from "../../utils/page";
import useLayout from "../../hooks/useLayout";
import Translation from "../translation";
import Icon from "../icon";
import useEscKey from "../../hooks/useEscKey";
import { userIsAdmin } from "../../utils/session";
import { useSolidAuth } from "@ldo/solid-react";
import { useLocation } from "react-router-dom";
import { bem } from "../../utils/bem";
import { useLocalization } from "@fluent/react";

export const TESTID_SUB_MENU_NAV_CLOSE_BUTTON = "sub-menu-nav-close-button";

export default function SubMenuNav() {
  const { full, setLeftOpen } = useLayout();
  const { session } = useSolidAuth();
  const { l10n } = useLocalization();

  useEscKey(() => setLeftOpen(false));

  // const { asPath } = useRouter();
  const location = useLocation();
  const pages = getPages(location.pathname, userIsAdmin(session));
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
          "text-right",
        )}
        onClick={() => setLeftOpen(false)}
        data-testid={TESTID_SUB_MENU_NAV_CLOSE_BUTTON}
        aria-label={l10n.getString("closeMenu")}
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
