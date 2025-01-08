import React, { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { useLocalStorage } from "@uidotdev/usehooks";
import Translation from "../translation";
import { bem } from "../../utils/bem";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function WarningMessage({
  children,
  className,
  id,
  ...props
}: Props) {
  const [hideNotification, setHideNotification] = useLocalStorage(
    `notification-${id}`,
  );
  return (
    !hideNotification && (
      <div
        className={clsx(
          "bg-yellow-200 text-yellow-900 border-yellow-400 border px-2 py-1 rounded-sm mb-2 relative",
          className,
        )}
        id={id}
        {...props}
      >
        {children}
        {id && (
          <button
            className={clsx(
              bem("button", "subtle"),
              "absolute right-0 top-0 text-yellow-800",
            )}
            onClick={() => setHideNotification(true.toString())}
          >
            <Translation id="ignore" />
          </button>
        )}
      </div>
    )
  );
}
