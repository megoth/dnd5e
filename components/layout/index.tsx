import React, { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import { getMessage } from "../../src/models/translation";
import useApp from "../../src/hooks/useApp";
import LocaleSelector from "../localeSelector";
import Logo from "../logo";

interface Props {
  children: ReactNode;
  home?: boolean;
}

export default function Layout({ children, home }: Props) {
  const app = useApp();

  const siteTitle = getMessage(app, "appName");
  const description = getMessage(app, "appDescription");

  const pages = [
    { href: "/about", label: getMessage(app, "aboutTitle") },
    { href: "/faq", label: getMessage(app, "faqShort") },
  ];

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta name="og:title" content={siteTitle} />
      </Head>
      {!home && (
        <header>
          <Link href="/">
            <a className="container mx-auto px-4 md:px-0 flex max-w-3xl">
              <Logo />
              <div className="font-serif text-2xl sm:text-3xl md:text-4xl self-center antialiased">
                {siteTitle}
              </div>
            </a>
          </Link>
        </header>
      )}
      {home ? (
        <main>{children}</main>
      ) : (
        <main className="container mx-auto px-4 md:px-0 my-1 max-w-3xl">
          {children}
        </main>
      )}
      <footer className="container mx-auto px-3 md:px-0 md:flex mt-2 max-w-3xl">
        <div className="md:flex-grow mb-2">
          {pages.map(({ href, label }) => (
            <Link href={href} key={label}>
              <a className="text-red-600 underline mr-1 p-1 focus:outline-none focus:ring-2 focus:ring-red-600">
                {label}
              </a>
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
  home: false,
};
