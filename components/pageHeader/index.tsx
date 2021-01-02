import Link from "next/link";
import clsx from "clsx";
import React, { HTMLAttributes } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import { bem } from "../../src/utils";
import Translation from "../translation";
import MainNav from "../mainNav";
import Icon from "../icon";
import useLayout from "../../src/hooks/useLayout";

export const TESTID_PAGE_HEADER_RIGHT_MENU_BUTTON =
  "page-header-right-menu-button";

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  login?: boolean;
}

export default function PageHeader({ className, login, ...props }: Props) {
  const { session } = useSession();
  const { rightOpen, setRightOpen } = useLayout();
  return (
    <header className={clsx("mb-2 shadow shadow-md", className)} {...props}>
      <div className={clsx(bem("main-container", "content"), "pr-0")}>
        <div
          className="flex font-serif self-center text-left"
          style={{ fontSize: "clamp(2rem, 3rem, 8vw)" }}
        >
          <Link href="/">
            <a className="flex-1 focus:outline-none focus:ring-2 focus:ring-red-600">
              <Translation id="appName" />
            </a>
          </Link>
          {login && (
            <button
              type="button"
              className="px-4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-600"
              onClick={() => setRightOpen(!rightOpen)}
              data-testid={TESTID_PAGE_HEADER_RIGHT_MENU_BUTTON}
            >
              {session.info.isLoggedIn ? (
                <Icon name="settings" />
              ) : (
                <Icon name="login" />
              )}
            </button>
          )}
        </div>
      </div>
      <MainNav />
    </header>
  );
}

PageHeader.defaultProps = {
  className: null,
  login: true,
};
