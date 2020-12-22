import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Content({ children }: Props) {
  return (
    <div className="content leading-normal max-w-3xl mx-auto">{children}</div>
  );
}
