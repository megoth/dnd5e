import React from "react";
import { NavLink } from "react-router-dom";

function flatten(text, child) {
  return typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

export function transformMarkdownLink(
  props: React.HTMLAttributes<HTMLAnchorElement>,
) {
  return <NavLink to={props["href"]} {...props} />;
}

export function transformMarkdownHeader(tagName: string) {
  return function renderHeaderInner(
    props: React.HTMLAttributes<HTMLHeadingElement>,
  ) {
    const children = React.Children.toArray(props.children);
    const text = children.reduce(flatten, "");
    const slug = text.toLowerCase().replace(/\W/g, "-");
    return React.createElement(tagName, { id: slug }, props.children);
  };
}
