import React, { ReactNode } from "react";

function flatten(text, child) {
  return typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

// eslint-disable-next-line import/prefer-default-export
export function HeadingRenderer({
  children,
  level,
}: {
  children: ReactNode;
  level: number;
}) {
  const text = React.Children.toArray(children).reduce(flatten, "");
  const slug = text.toLowerCase().replace(/\W/g, "-");
  return React.createElement(`h${level}`, { id: slug }, children);
}
