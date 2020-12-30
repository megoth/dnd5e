import Link from "next/link";
import clsx from "clsx";
import React, { HTMLAttributes } from "react";
import { bem } from "../../src/utils";
import Translation from "../translation";
import MainNav from "../mainNav";

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function PageHeader({ className, ...props }: Props) {
  return (
    <header className={clsx("mb-2 shadow shadow-lg", className)} {...props}>
      <div className={clsx(bem("main-container", "content"))}>
        <div
          className="font-serif self-center"
          style={{ fontSize: "clamp(1.5rem, 3rem, 8vw)" }}
        >
          <Link href="/">
            <a className="focus:outline-none focus:ring-2 focus:ring-red-600">
              <Translation id="appName" />
            </a>
          </Link>
        </div>
      </div>
      <MainNav />
    </header>
  );
}

PageHeader.defaultProps = {
  className: null,
};
