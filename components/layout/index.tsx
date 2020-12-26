import React, { HTMLAttributes, ReactNode } from "react";
import Head from "next/head";
import clsx from "clsx";
import { getMessage } from "../../src/models/translation";
import useApp from "../../src/hooks/useApp";
import { bem } from "../../src/utils";
import PageHeader from "../pageHeader";
import PageFooter from "../pageFooter";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  full?: boolean;
  header?: boolean;
  footer?: boolean;
}

export default function Layout({
  children,
  full,
  header,
  footer,
  className,
  ...props
}: Props) {
  const app = useApp();

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
        <main className={className} {...props}>
          {children}
        </main>
      ) : (
        <main
          className={clsx(bem("main-container", "content"), "my-1", className)}
          {...props}
        >
          {children}
        </main>
      )}
      {footer && <PageFooter />}
    </>
  );
}

Layout.defaultProps = {
  full: false,
  className: null,
  header: true,
  footer: true,
};
