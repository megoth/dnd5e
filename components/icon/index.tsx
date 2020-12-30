import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<SVGElement> {
  name: "close" | "menu";
}

export default function Icon({ name, ...props }: Props) {
  const iconProps = {
    className: "icon",
    ...props,
  };
  // eslint-disable-next-line default-case
  switch (name) {
    case "close":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          {...iconProps}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      );
    case "menu":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          {...iconProps}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      );
  }
}
