import React, { HTMLAttributes } from "react";
import clsx from "clsx";
import useApp from "../../src/hooks/useApp";
import { getMessage } from "../../src/models/translation";

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function Logo({ className, ...props }: Props) {
  const app = useApp();
  const logoDescription = getMessage(app, "appLogoDescription");
  return (
    <picture className={clsx("inline-block", className)} {...props}>
      <source
        srcSet="/icons/app/icons8-dungeons-and-dragons-256.png"
        media="(min-width: 600px)"
      />
      <img
        src="/icons/app/icons8-dungeons-and-dragons-128.png"
        alt={logoDescription}
      />
    </picture>
  );
}

Logo.defaultProps = {
  className: null,
};
