import React, { HTMLAttributes, ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import clsx from "clsx";
import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/router";
import { getMessage } from "../../src/models/translation";
import useApp from "../../src/hooks/useApp";
import { bem } from "../../src/utils";
import PageHeader from "../pageHeader";
import PageFooter from "../pageFooter";
import SubMenuNav from "../subMenuNav";
import LayoutProvider from "../../src/contexts/layout";
import { getSubPages } from "../../src/models/page";
import Session from "../session";

export const TESTID_LAYOUT_FADE = "layout-fade";
export const TESTID_LAYOUT_SUB_MENU = "layout-sub-menu";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  full?: boolean;
  header?: boolean;
  footer?: boolean;
  login?: boolean;
}

export default function Layout({
  children,
  full,
  header,
  footer,
  className,
  login,
  ...props
}: Props) {
  const app = useApp();
  const [leftOpen, setLeftOpen] = useState<boolean>(false);
  const [delayedLeftOpen, setDelayedLeftOpen] = useState<boolean>(false);
  useEffect(() => setDelayedLeftOpen(leftOpen), [leftOpen]);
  const [rightOpen, setRightOpen] = useState<boolean>(
    localStorage.getItem("right-menu-open") === "true"
  );
  const [delayedRightOpen, setDelayedRightOpen] = useState<boolean>(false);
  useEffect(
    () => localStorage.setItem("right-menu-open", rightOpen.toString()),
    [rightOpen]
  );
  useEffect(() => setDelayedRightOpen(rightOpen), [rightOpen]);
  const { asPath } = useRouter();
  const pages = getSubPages(asPath);
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setRightOpen(!full && !leftOpen);
      setLeftOpen(false);
    },
    onSwipedRight: () => {
      setLeftOpen(pages.length > 0 && !rightOpen);
      setRightOpen(false);
    },
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
      <LayoutProvider
        leftOpen={leftOpen}
        rightOpen={rightOpen}
        setLeftOpen={setLeftOpen}
        setRightOpen={setRightOpen}
      >
        {header && <PageHeader login={login} />}
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
                "bg-black fixed top-0 left-0 w-screen h-screen opacity-80 z-0 xl:hidden z-10",
                {
                  hidden: !leftOpen && !rightOpen,
                }
              )}
              onClick={() => {
                setLeftOpen(false);
                setRightOpen(false);
              }}
              type="button"
              data-testid={TESTID_LAYOUT_FADE}
            >
              &nbsp;
            </button>
            <div
              className={clsx(
                bem("main-container", "content", "main"),
                "lg:flex-1 flex flex-col lg:flex-row lg:space-x-2"
              )}
            >
              <div
                className={clsx(
                  bem("layout__sub-menu", {
                    open: delayedLeftOpen,
                  }),
                  "lg:flex-1",
                  {
                    hidden: !leftOpen,
                    "z-20": leftOpen,
                  },
                  "lg:block"
                )}
                data-testid={TESTID_LAYOUT_SUB_MENU}
              >
                <SubMenuNav />
              </div>
              <div className="lg:flex-auto flex flex-col max-w-prose min-h-full">
                <main className="flex-1">{children}</main>
                {footer && <PageFooter />}
              </div>
              <div
                className={clsx("hidden lg:block lg:flex-1", {
                  "xl:hidden": rightOpen,
                })}
              />
              <div
                className={clsx(
                  bem("layout__right-menu", {
                    open: delayedRightOpen,
                  }),
                  "xl:flex-1 xl:-top-2 xl:-mb-2 bg-gray-100 dark:bg-gray-900 xl:bg-transparent xl:dark:bg-transparent",
                  {
                    hidden: !rightOpen,
                    "z-20": rightOpen,
                  }
                )}
              >
                <Session />
              </div>
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
  login: true,
};
