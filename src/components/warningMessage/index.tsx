import React, { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { useLocalStorage } from "@uidotdev/usehooks";
import Translation from "../translation";
import { bem } from "../../utils/bem";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
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
          "bg-yellow-200 text-yellow-900 border-yellow-400 border px-2 py-1 rounded-sm mb-2 flex",
          className,
        )}
        id={id}
        {...props}
      >
        <div className="flex-grow">{children || <Translation id={id} />}</div>
        {id && (
          <button
            className={clsx(
              bem("button", "subtle"),
              "text-yellow-800 flex-grow-0",
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
