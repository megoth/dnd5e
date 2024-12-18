import React, { HTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function Logo({ className, ...props }: Props) {
  const logoDescription = "appLogoDescription";
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
