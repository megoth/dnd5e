import React, { HTMLAttributes } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import clsx from "clsx";
import NavItem from "../navItem";
import { Page } from "../../src/models/page";
import { bem } from "../../src/utils";
import { userIsAdmin } from "../../src/models/session";

export const TESTID_MAIN_NAV_LIST_ITEM = "main-nav-list-item";

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function MainNav({ className, ...props }: Props) {
  const { session } = useSession();
  const admin = userIsAdmin(session);
  const pages: Array<Page> = [
    {
      href: "/characters",
      translationId: "charactersPageTitle",
    },
    {
      href: "/rules",
      translationId: "rulesPageTitle",
    },
    ...(admin
      ? [
          {
            href: "/admin",
            translationId: "adminPageTitle",
            bundle: "admin",
          },
        ]
      : []),
  ];
  return (
    <nav className={clsx(bem("pages-nav", "main-menu"), className)} {...props}>
      <ul className={bem("pages-nav__list", "main-menu")}>
        {pages.map((page) => (
          <NavItem
            key={page.href}
            mainNav
            modifiers="main-menu"
            {...page}
            data-testid={TESTID_MAIN_NAV_LIST_ITEM}
          />
        ))}
      </ul>
    </nav>
  );
}

MainNav.defaultProps = {
  className: null,
};
