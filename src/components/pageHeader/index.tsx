import clsx from "clsx";
import React, { HTMLAttributes } from "react";
import Translation from "../translation";
import Icon from "../icon";
import useLayout from "../../hooks/useLayout";
import { useSolidAuth } from "@ldo/solid-react";
import { NavLink } from "react-router-dom";
import { bem } from "../../utils/bem";
import SearchForm from "../searchForm";

export const TESTID_PAGE_HEADER_LEFT_MENU_BUTTON =
  "page-header-left-menu-button";
export const TESTID_PAGE_HEADER_RIGHT_MENU_BUTTON =
  "page-header-right-menu-button";

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function PageHeader({ className, ...props }: Props) {
  const { session } = useSolidAuth();
  const { full, rightOpen, setLeftOpen, setRightOpen } = useLayout();
  return (
    <header
      className={clsx(
        "mb-2 shadow-md sticky top-0 lg:relative z-10 bg-white dark:bg-gray-800",
        className,
      )}
      {...props}
    >
      <div className={bem("main-container", "header")}>
        <NavLink
          to="/"
          className={clsx(
            "block px-4 font-2xl font-serif self-center text-left focus:outline-none focus:ring-2 focus:ring-red-600",
            {
              "lg:px-2": !full,
              "lg:px-4": full,
            },
          )}
          style={{ fontSize: "clamp(1rem, 2rem, 8vw)" }}
        >
          <Translation id="appName" />
        </NavLink>
      </div>
      <div className="bg-gray-100 dark:bg-gray-900">
        <div
          className={clsx(bem("main-container", "subheader"), "flex flex-row")}
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
          <div className="flex-1 flex items-center justify-end">
            <SearchForm modifier="global-search" path="/search" />
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
