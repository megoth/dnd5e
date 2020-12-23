import Link from "next/link";
import clsx from "clsx";
import React from "react";
import { bem } from "../../src/utils";
import Logo from "../logo";
import Translation from "../translation";

export default function PageHeader() {
  return (
    <header>
      <Link href="/">
        <a className={clsx(bem("main-container", "content"), "flex")}>
          <Logo />
          <div className="font-serif text-2xl sm:text-3xl md:text-4xl self-center antialiased">
            <Translation id="appName" />
          </div>
        </a>
      </Link>
    </header>
  );
}
