import Link from "next/link";
import React, { HTMLAttributes } from "react";
import { useRouter } from "next/router";
import Translation from "../translation";
import { Page } from "../../src/models/page";
import { bem } from "../../src/utils";

interface Props extends Page, HTMLAttributes<HTMLLIElement> {
  children?: Array<Page>;
}

export default function NavItem({
  bundle,
  children,
  href,
  translationId,
  ...props
}: Props) {
  const { asPath } = useRouter();
  const selected = asPath === href;
  const childSelected = asPath.startsWith(href);
  return (
    <li {...props}>
      <Link href={href}>
        <a
          className={bem("pages-nav__link", {
            selected,
            "child-selected": childSelected,
          })}
        >
          <Translation id={translationId} bundle={bundle} />
        </a>
      </Link>
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

NavItem.defaultProps = {
  children: [],
};
