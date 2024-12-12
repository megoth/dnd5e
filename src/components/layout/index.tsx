import React, { HTMLAttributes, useEffect, useState } from "react";
import clsx from "clsx";
import { useSwipeable } from "react-swipeable";
import PageHeader from "../pageHeader";
import PageFooter from "../pageFooter";
import SubMenuNav from "../subMenuNav";
import Session from "../session";
import useLayout from "../../hooks/useLayout";
import { bem } from "../../utils/bem";

export const TESTID_LAYOUT_FADE = "layout-fade";
export const TESTID_LAYOUT_SUB_MENU = "layout-sub-menu";

interface Props extends HTMLAttributes<HTMLDivElement> {
  full?: boolean;
  header?: boolean;
  pageName?: string;
  bundle?: string;
  className?: string;
}

export default function Layout({
  children,
  full = false,
  header = true,
  pageName,
  bundle,
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
    onSwipedLeft: () => {
      setRightOpen(!leftOpen);
      setLeftOpen(false);
    },
    onSwipedRight: () => {
      setLeftOpen(!rightOpen);
      setRightOpen(false);
    },
  });

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
      {header && <PageHeader pageName={pageName} bundle={bundle} />}
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
          {!full && <PageFooter />}
        </div>
        <div className={bem("layout__sidebar", "right-fake", modifiers)} />
        <div className={bem("layout__sidebar", "right", modifiers)}>
          <Session />
        </div>
      </div>
    </div>
  );
}
