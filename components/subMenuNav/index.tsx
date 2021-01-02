import React from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import NavItem from "../navItem";
import { bem } from "../../src/utils";
import { getSubPages } from "../../src/models/page";
import useLayout from "../../src/hooks/useLayout";
import Translation from "../translation";
import Icon from "../icon";
import useEscKey from "../../src/hooks/useEscKey";

export const TESTID_SUB_MENU_NAV_CLOSE_BUTTON = "sub-menu-nav-close-button";

export default function SubMenuNav() {
  const { setLeftOpen } = useLayout();

  useEscKey(() => setLeftOpen(false));

  const { asPath } = useRouter();
  const pages = getSubPages(asPath);
  return pages.length ? (
    <>
      <nav className={clsx(bem("pages-nav", "sub-menu"))}>
        <button
          type="button"
          className={clsx(bem("button", "close"), "mb-9 lg:hidden text-right")}
          onClick={() => setLeftOpen(false)}
          data-testid={TESTID_SUB_MENU_NAV_CLOSE_BUTTON}
        >
          <Icon name="close" />
          &nbsp;
          <Translation id="close" />
        </button>
        <ul className={bem("nav-pages__list", "sub-menu")}>
          {pages.map((page) => (
            <NavItem key={page.href} modifiers="sub-menu" {...page} />
          ))}
        </ul>
      </nav>
    </>
  ) : null;
}
