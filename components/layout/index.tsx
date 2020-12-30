import React, { HTMLAttributes, ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import clsx from "clsx";
import { useSwipeable } from "react-swipeable";
import { getMessage } from "../../src/models/translation";
import useApp from "../../src/hooks/useApp";
import { bem } from "../../src/utils";
import PageHeader from "../pageHeader";
import PageFooter from "../pageFooter";
import SubMenuNav from "../subMenuNav";
import LayoutProvider from "../../src/contexts/layout";

export const TESTID_LAYOUT_FADE = "layout-fade";
export const TESTID_LAYOUT_SUB_MENU = "layout-sub-menu";

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
  const [subMenuOpen, setSubMenuOpen] = useState<boolean>(false);
  const [delayedMenuOpen, setDelayedMenuOpen] = useState<boolean>(false);
  useEffect(() => setDelayedMenuOpen(subMenuOpen), [subMenuOpen]);
  const handlers = useSwipeable({
    onSwipedLeft: () => setSubMenuOpen(false),
    onSwipedRight: () => setSubMenuOpen(true),
  });

  return (
    <div className="flex-1 flex flex-col relative min-h-full" {...handlers}>
      <Head>
        <title>{getMessage(app, "appName")}</title>
        <meta name="application-name" content={getMessage(app, "appName")} />
        <meta
          name="apple-mobile-web-app-title"
          content={getMessage(app, "appName")}
        />
        <meta name="description" content={getMessage(app, "appDescription")} />
        <meta name="twitter:title" content={getMessage(app, "appName")} />
        <meta
          name="twitter:description"
          content={getMessage(app, "appDescription")}
        />
        <meta name="og:title" content={getMessage(app, "appName")} />
        <meta
          property="og:description"
          content={getMessage(app, "appDescription")}
        />
        <meta property="og:site_name" content={getMessage(app, "appName")} />
      </Head>
      <LayoutProvider setSubMenuOpen={setSubMenuOpen}>
        {header && <PageHeader />}
        {full ? (
          <>
            <main className={className} {...props}>
              {children}
            </main>
            {footer && <PageFooter />}
          </>
        ) : (
          <>
            <button
              className={clsx(
                "bg-black fixed top-0 left-0 w-screen h-screen opacity-80 z-0 lg:hidden",
                {
                  hidden: !subMenuOpen,
                }
              )}
              onClick={() => setSubMenuOpen(false)}
              type="button"
              data-testid={TESTID_LAYOUT_FADE}
            >
              &nbsp;
            </button>
            <div
              className={clsx(
                bem("main-container", "content", "main"),
                "flex-1 flex flex-col lg:flex-row lg:space-x-2"
              )}
            >
              <div
                className={clsx(
                  bem("layout__sub-menu", {
                    open: delayedMenuOpen,
                  }),
                  {
                    hidden: !subMenuOpen,
                  },
                  "lg:block"
                )}
                data-testid={TESTID_LAYOUT_SUB_MENU}
              >
                <SubMenuNav />
              </div>
              <div className="flex-1 lg:flex-auto flex flex-col max-w-prose min-h-full">
                <main className="flex-1">{children}</main>
                {footer && <PageFooter />}
              </div>
              <div className="hidden lg:block lg:flex-1" />
            </div>
          </>
        )}
      </LayoutProvider>
    </div>
  );
}

Layout.defaultProps = {
  full: false,
  className: null,
  header: true,
  footer: true,
};
