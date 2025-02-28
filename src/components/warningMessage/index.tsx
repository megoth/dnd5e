import React, { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { useLocalStorage } from "@uidotdev/usehooks";
import Translation from "../translation";
import { bem } from "../../utils/bem";
import Content from "../content";
import Markdown from "react-markdown";
import { useLocalization } from "@fluent/react";
import { transformMarkdownLink } from "../../utils/markdown";

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
  const { l10n } = useLocalization();
  const [hideNotification, setHideNotification] = useLocalStorage(
    `notification-${id}`,
  );
  return (
    !hideNotification && (
      <div className={clsx("warning", className)} id={id} {...props}>
        <Content className="flex-grow">
          {children || (
            <Markdown
              components={{
                a: transformMarkdownLink,
              }}
            >
              {l10n.getString(id)}
            </Markdown>
          )}
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
