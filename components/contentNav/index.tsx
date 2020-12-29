import React from "react";
import NavItem from "../navItem";
import { Page } from "../../src/models/page";
import { bem } from "../../src/utils";

const pages: Array<Page> = [
  {
    href: "/characters",
    translationId: "charactersPageTitle",
  },
  {
    href: "/encounters",
    translationId: "encountersPageTitle",
  },
  {
    href: "/notes",
    translationId: "notesPageTitle",
  },
];

export default function ContentNav() {
  return (
    <nav className={bem("pages-nav", "content")}>
      <ul className="pages-nav__list">
        {pages.map((page) => (
          <NavItem key={page.href} {...page} />
        ))}
      </ul>
    </nav>
  );
}
