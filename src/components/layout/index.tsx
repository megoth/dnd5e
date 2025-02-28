import React, { HTMLAttributes, useEffect, useState } from "react";
import clsx from "clsx";
import { useSwipeable } from "react-swipeable";
import PageHeader from "../pageHeader";
import SubMenuNav from "../subMenuNav";
import Session from "../session";
import useLayout from "../../hooks/useLayout";
import { bem } from "../../utils/bem";
import { ScrollRestoration } from "react-router-dom";
import { useLocalization } from "@fluent/react";

export const TESTID_LAYOUT_FADE = "layout-fade";
export const TESTID_LAYOUT_SUB_MENU = "layout-sub-menu";

function isInsideTable(target: HTMLElement): boolean {
  return (
    target.nodeName === "TD" ||
    target.nodeName === "TH" ||
    target.classList.contains("table-container")
  );
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  full?: boolean;
  header?: boolean;
  className?: string;
}

export default function Layout({
  children,
  full = false,
  header = true,
  className,
  ...props
}: Props) {
  const { leftOpen, rightOpen, setFull, setLeftOpen, setRightOpen } =
    useLayout();

  useEffect(() => setFull(full), []);

  const [delayedLeftOpen, setDelayedLeftOpen] = useState<boolean>(false);
  useEffect(() => setDelayedLeftOpen(leftOpen), [leftOpen]);
  const [delayedRightOpen, setDelayedRightOpen] = useState<boolean>(false);
  useEffect(() => setDelayedRightOpen(rightOpen), [rightOpen]);

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      if (isInsideTable(eventData.event.target as HTMLElement)) return;
      setRightOpen(!leftOpen);
      setLeftOpen(false);
    },
    onSwipedRight: (eventData) => {
      if (isInsideTable(eventData.event.target as HTMLElement)) return;
      setLeftOpen(!rightOpen);
      setRightOpen(false);
    },
  });

  const { l10n } = useLocalization();

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
      {header && <PageHeader className="flex-grow-0" />}
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
          aria-label={l10n.getString("closeMenu")}
        >
          &nbsp;
        </button>
      )}
      <div
        className={clsx(
          bem("main-container", {
            content: !full,
            full,
          }),
          bem("layout-container", {
            content: !full,
            full,
            ["with-meta"]: rightOpen,
          }),
          "flex-grow lg:flex-grow-0",
        )}
      >
        <div
          className={bem("layout__sidebar", "left", modifiers)}
          data-testid={TESTID_LAYOUT_SUB_MENU}
        >
          <SubMenuNav />
        </div>
        <div className={bem("layout__main", modifiers)}>
          <main
            className={clsx("flex-1", className, {
              "min-h-screen": full,
            })}
            {...props}
          >
            {children}
          </main>
        </div>
        <div className={bem("layout__sidebar", "right", modifiers)}>
          <Session />
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
}
