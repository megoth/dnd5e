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
  const { setSubMenuOpen } = useLayout();
  useEscKey(() => setSubMenuOpen(false));

  const { asPath } = useRouter();
  const pages = getSubPages(asPath);
  return pages.length ? (
    <>
      <nav className={clsx(bem("pages-nav", "sub-menu"))}>
        <button
          type="button"
          className="button lg:hidden bg-transparent border-transparent text-right px-2 w-full hover:bg-gray-900 hover:text-white dark:text-white focus:ring-gray-900 mb-9"
          onClick={() => setSubMenuOpen(false)}
          data-testid={TESTID_SUB_MENU_NAV_CLOSE_BUTTON}
        >
          <Translation id="close" />
          &nbsp;
          <Icon name="close" />
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
