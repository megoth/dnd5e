import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import Translation from "../translation";
import { Page } from "../../src/models/page";
import { bem } from "../../src/utils";
import useLayout from "../../src/hooks/useLayout";
import Icon from "../icon";

interface Props extends Page {
  mainNav?: boolean;
  modifiers?: string;
}

export default function NavItem({
  bundle,
  href,
  translationId,
  mainNav,
  modifiers,
}: Props) {
  const { setSubMenuOpen } = useLayout();

  const { asPath } = useRouter();
  const selected = asPath === href;
  const childSelected = asPath.startsWith(href);
  return (
    <li className="flex">
      <Link href={href}>
        <a
          className={bem("pages-nav__link", modifiers, {
            selected,
            "child-selected": childSelected,
          })}
        >
          <Translation id={translationId} bundle={bundle} />
        </a>
      </Link>
      {mainNav && (selected || childSelected) && (
        <button
          type="button"
          className={clsx(bem("pages-nav__button", modifiers), "lg:hidden")}
          onClick={() => setSubMenuOpen(true)}
        >
          <Icon name="menu" />
        </button>
      )}
    </li>
  );
}

NavItem.defaultProps = {
  mainNav: false,
  modifiers: null,
};
