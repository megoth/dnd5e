import clsx from "clsx";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import { bem } from "../../src/utils";
import LocaleSelector from "../localeSelector";
import { getMessage } from "../../src/models/translation";
import useApp from "../../src/hooks/useApp";
import DarkModeSelector from "../darkModeSelector";

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function PageFooter({ className, ...props }: Props) {
  const app = useApp();
  const pages = [
    { href: "/about", label: getMessage(app, "aboutTitle") },
    { href: "/faq", label: getMessage(app, "faqShort") },
  ];

  return (
    <footer
      className={clsx(
        bem("main-container", "content"),
        "mt-2 text-center sm:text-left xs:flex xs:space-x-4 items-center justify-center sm:justify-start",
        className
      )}
      {...props}
    >
      <div className="md:flex-grow pb-2 flex space-x-1 justify-center sm:justify-start">
        {pages.map(({ href, label }) => (
          <Link href={href} key={label}>
            <a className="link">{label}</a>
          </Link>
        ))}
      </div>
      <div className="pb-2 flex xs:space-x-2 space-y-2 xs:space-y-0 flex-col text-center xs:flex-row xs:justify-center">
        <DarkModeSelector />
        <LocaleSelector />
      </div>
    </footer>
  );
}

PageFooter.defaultProps = {
  className: null,
};
