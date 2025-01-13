import { NavLink } from "react-router-dom";
import Translation from "../translation";
import Icon from "../icon";
import React from "react";

interface Breadcrumb {
  href?: string;
  text?: string;
  translationId?: string;
}

interface Props {
  crumbs: Array<Breadcrumb>;
}

export default function Breadcrumbs({ crumbs }: Props) {
  return (
    <nav className="breadcrumbs">
      <ol>
        {crumbs.map((crumb, index) => (
          <li key={crumb.href || crumb.text || crumb.translationId}>
            {index > 0 && <Icon name={"breadcrumb-divider"} />}
            {crumb.href && (
              <NavLink to={crumb.href}>
                {crumb.translationId ? (
                  <Translation id={crumb.translationId} />
                ) : (
                  crumb.text
                )}
              </NavLink>
            )}
            {!crumb.href && (
              <span>
                {crumb.translationId ? (
                  <Translation id={crumb.translationId} />
                ) : (
                  crumb.text
                )}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
