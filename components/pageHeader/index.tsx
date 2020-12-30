import Link from "next/link";
import clsx from "clsx";
import React from "react";
import { bem } from "../../src/utils";
import Logo from "../logo";
import Translation from "../translation";
import MainNav from "../mainNav";

export default function PageHeader() {
  return (
    <header>
      <div className={clsx(bem("main-container", "content"), "flex")}>
        <Link href="/">
          <a className="focus:outline-none focus:ring-2 focus:ring-red-600">
            <Logo />
          </a>
        </Link>
        <div className="flex-1">
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
          <MainNav />
        </div>
      </div>
    </header>
  );
}
