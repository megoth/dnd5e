import clsx from "clsx";
import React, { HTMLAttributes } from "react";
import { NavLink } from "react-router-dom";
import Translation from "../translation";
import { bem } from "../../utils/bem";

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function PageFooter({ className, ...props }: Props) {
  const pages = [
    { href: "/about", label: "aboutPageTitle" },
    { href: "/faq", label: "faqShort" },
  ];

  return (
    <footer
      className={clsx(
        bem("main-container", "content"),
        "mt-8 text-center sm:text-left xs:flex xs:space-x-4 items-center justify-center sm:justify-start",
        className,
      )}
      {...props}
    >
      <div className="md:flex-grow pb-2 flex space-x-1 justify-center sm:justify-start">
        {pages.map(({ href, label }) => (
          <NavLink to={href} key={label} className="link">
            <Translation id={label} />
          </NavLink>
        ))}
      </div>
    </footer>
  );
}
