import React, { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import clsx from "clsx";
import { getMessage } from "../../src/models/translation";
import useApp from "../../src/hooks/useApp";
import LocaleSelector from "../localeSelector";
import { bem } from "../../src/utils";
import PageHeader from "../pageHeader";

interface Props {
  children: ReactNode;
  full?: boolean;
  header?: boolean;
}

export default function Layout({ children, full, header }: Props) {
  const app = useApp();

  const pages = [
    { href: "/about", label: getMessage(app, "aboutTitle") },
    { href: "/faq", label: getMessage(app, "faqShort") },
  ];

  return (
    <>
      <Head>
        <title>{getMessage(app, "appName")}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={getMessage(app, "appDescription")} />
        <meta name="og:title" content={getMessage(app, "appName")} />
      </Head>
      {header && <PageHeader />}
      {full ? (
        <main>{children}</main>
      ) : (
        <main className={clsx(bem("main-container", "content"), "my-1")}>
          {children}
        </main>
      )}
      <footer
        className={clsx(bem("main-container", "content"), "md:flex mt-2")}
      >
        <div className="md:flex-grow mb-2">
          {pages.map(({ href, label }) => (
            <Link href={href} key={label}>
              <a className="link mr-1 p-1">{label}</a>
            </Link>
          ))}
        </div>
        <div className="mb-2">
          <LocaleSelector />
        </div>
      </footer>
    </>
  );
}

Layout.defaultProps = {
  full: false,
  header: true,
};
