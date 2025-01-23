import React, { HTMLAttributes } from "react";

export default function SolidLogo(props: HTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src="/logos/solid-emblem.svg"
      alt={"loginImage"}
      style={{ maxWidth: 200 }}
      {...props}
    />
  );
}
