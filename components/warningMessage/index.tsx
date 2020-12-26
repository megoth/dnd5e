import React, { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export default function WarningMessage({
  children,
  className,
  ...props
}: Props) {
  return (
    <div
      className={clsx(
        "bg-yellow-200 text-yellow-900 border-yellow-400 border px-2 py-1 rounded-sm mb-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

WarningMessage.defaultProps = {
  className: null,
};
