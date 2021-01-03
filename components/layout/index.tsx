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
import Session from "../session";

export const TESTID_LAYOUT_FADE = "layout-fade";
export const TESTID_LAYOUT_SUB_MENU = "layout-sub-menu";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  full?: boolean;
  header?: boolean;
  pageName?: string;
  className?: string;
}

export default function Layout({
  children,
  full,
  header,
  pageName,
  className,
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
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setRightOpen(!leftOpen);
      setLeftOpen(false);
    },
    onSwipedRight: () => {
      setLeftOpen(!rightOpen);
      setRightOpen(false);
    },
  });
  const router = useRouter();
  useEffect(() => {
    setLeftOpen(false);
    setRightOpen(localStorage.getItem("right-menu-open") === "true");
  }, [router]);

  const open = leftOpen || rightOpen;
  const modifiers = {
    full,
    content: !full,
    "left-open": leftOpen,
    "delayed-left-open": delayedLeftOpen,
    "right-open": rightOpen,
    "delayed-right-open": delayedRightOpen,
    open,
  };

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
        full={full}
        leftOpen={leftOpen}
        rightOpen={rightOpen}
        setLeftOpen={setLeftOpen}
        setRightOpen={setRightOpen}
      >
        {header && <PageHeader pageName={pageName} />}
        {open && (
          <button
            className={bem("layout__fade", modifiers)}
            onClick={() => {
              setLeftOpen(false);
              setRightOpen(false);
            }}
            type="button"
            data-testid={TESTID_LAYOUT_FADE}
            data-open={open}
          >
            &nbsp;
          </button>
        )}
        <div
          className={bem("main-container", {
            full,
          })}
        >
          <div
            className={bem("layout__sidebar", "left", modifiers)}
            data-testid={TESTID_LAYOUT_SUB_MENU}
          >
            <SubMenuNav />
          </div>
          <div className={bem("layout__main", modifiers)}>
            <main className={clsx("flex-1", className)} {...props}>
              {children}
            </main>
            <PageFooter />
          </div>
          <div className={bem("layout__sidebar", "right-fake", modifiers)} />
          <div className={bem("layout__sidebar", "right", modifiers)}>
            <Session />
          </div>
        </div>
      </LayoutProvider>
    </div>
  );
}

Layout.defaultProps = {
  full: false,
  className: null,
  header: true,
  pageName: null,
};
