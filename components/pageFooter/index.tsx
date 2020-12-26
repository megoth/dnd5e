import clsx from "clsx";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import { bem } from "../../src/utils";
import LocaleSelector from "../localeSelector";
import { getMessage } from "../../src/models/translation";
import useApp from "../../src/hooks/useApp";

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
        "md:flex mt-2",
        className
      )}
      {...props}
    >
      <div className="md:flex-grow pb-2">
        {pages.map(({ href, label }) => (
          <Link href={href} key={label}>
            <a className="link mr-1 p-1">{label}</a>
          </Link>
        ))}
      </div>
      <div className="pb-2">
        <LocaleSelector />
      </div>
    </footer>
  );
}

PageFooter.defaultProps = {
  className: null,
};
