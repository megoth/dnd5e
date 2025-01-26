import React, { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { useLocalStorage } from "@uidotdev/usehooks";
import Translation from "../translation";
import { bem } from "../../utils/bem";
import Content from "../content";

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
      <div className={clsx("warning", className)} id={id} {...props}>
        <Content className="flex-grow">
          {children || <Translation id={id} />}
        </Content>
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
