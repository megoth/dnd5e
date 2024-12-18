import React, { HTMLAttributes } from "react";
import Translation from "../translation";
import { Page } from "../../utils/page";
import { NavLink, useLocation } from "react-router-dom";
import { bem } from "../../utils/bem";

interface Props extends Page, Omit<HTMLAttributes<HTMLLIElement>, "children"> {
  children?: Array<Page>;
}

export default function NavItem({
  bundle,
  children = [],
  href,
  translationId,
  ...props
}: Props) {
  const location = useLocation();
  const selected = location.pathname === href;
  const childSelected = location.pathname.startsWith(href);
  return (
    <li {...props}>
      <NavLink
        to={href}
        className={bem("pages-nav__link", {
          selected,
          "child-selected": childSelected,
        })}
      >
        <Translation id={translationId} bundle={bundle} />
      </NavLink>
      {children.length ? (
        <ul className="ml-4">
          {children.map((page) => (
            <NavItem key={page.href} {...page} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}
