import React from "react";
import { useSession } from "@inrupt/solid-ui-react";
import NavItem from "../navItem";
import { Page } from "../../src/models/page";
import { bem } from "../../src/utils";
import { userIsAdmin } from "../../src/models/session";

export default function MainNav() {
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
    <nav className={bem("pages-nav", "main-menu")}>
      <ul className={bem("pages-nav__list", "main-menu")}>
        {pages.map((page) => (
          <NavItem key={page.href} mainNav modifiers="main-menu" {...page} />
        ))}
      </ul>
    </nav>
  );
}
