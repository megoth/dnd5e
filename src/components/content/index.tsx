import React, { ReactNode } from "react";
import clsx from "clsx";

interface Props {
  children: ReactNode;
  className?: string;
  hyphens?: boolean;
}

export default function Content({
  children,
  className,
  hyphens = true,
}: Props) {
  return (
    <div
      className={clsx("content leading-normal max-w-prose mx-auto", className)}
      style={{ hyphens: hyphens ? "auto" : "manual" }}
    >
      {children}
    </div>
  );
}
