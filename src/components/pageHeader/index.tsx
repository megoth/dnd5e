import clsx from "clsx";
import React, { HTMLAttributes } from "react";
import Translation from "../translation";
import Icon from "../icon";
import useLayout from "../../hooks/useLayout";
import { useSolidAuth } from "@ldo/solid-react";
import { NavLink } from "react-router-dom";
import { bem } from "../../utils/bem";

export const TESTID_PAGE_HEADER_LEFT_MENU_BUTTON =
  "page-header-left-menu-button";
export const TESTID_PAGE_HEADER_RIGHT_MENU_BUTTON =
  "page-header-right-menu-button";

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  pageName?: string;
}

export default function PageHeader({ className, pageName, ...props }: Props) {
  const { session } = useSolidAuth();
  const { full, rightOpen, setLeftOpen, setRightOpen } = useLayout();
  return (
    <header className={clsx("mb-2 shadow shadow-md", className)} {...props}>
      <div className={clsx(bem("main-container", "content"), "pr-0")}>
        <NavLink
          to="/"
          className="px-4 lg:px-0 font-2xl font-serif self-center text-left focus:outline-none focus:ring-2 focus:ring-red-600"
          style={{ fontSize: "clamp(2rem, 3rem, 8vw)" }}
        >
          <Translation id="appName" />
        </NavLink>
      </div>
      <div className="bg-gray-100 dark:bg-gray-900">
        <div
          className={clsx(
            bem("main-container", "content"),
            "flex flex-row px-0",
          )}
        >
          <button
            type="button"
            className={clsx(
              "p-2 px-4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-600",
              {
                "lg:hidden": !full,
              },
            )}
            onClick={() => setLeftOpen(true)}
            data-testid={TESTID_PAGE_HEADER_LEFT_MENU_BUTTON}
          >
            <Icon name="menu" />
          </button>
          <div className="flex-1 text-lg font-semibold font-serif leading-10">
            <Translation id={pageName} />
          </div>
          <button
            type="button"
            className="p-2 px-4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-600"
            onClick={() => setRightOpen(!rightOpen)}
            data-testid={TESTID_PAGE_HEADER_RIGHT_MENU_BUTTON}
          >
            {session.isLoggedIn ? (
              <Icon name="settings" />
            ) : (
              <Icon name="login" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
