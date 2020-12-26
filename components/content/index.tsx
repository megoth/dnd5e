import React, { ReactNode } from "react";
import clsx from "clsx";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Content({ children, className }: Props) {
  return (
    <div
      className={clsx("content leading-normal max-w-prose mx-auto", className)}
    >
      {children}
    </div>
  );
}

Content.defaultProps = {
  className: null,
};
