import React from "react";
import ReactMarkdown from "react-markdown";
import Layout from "../layout";
import Content from "../content";
import useApp from "../../hooks/useApp";
import WarningMessage from "../warningMessage";
import Translation from "../translation";
// TODO: FIX lazy solution
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import readmeMarkdown from "../../../README.md?raw";
import { NavLink } from "react-router-dom";

export const TESTID_ABOUT_PAGE_LANGUAGE_WARNING = "about-page-language-warning";

function flatten(text, child) {
  return typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function renderLink(props: React.HTMLAttributes<HTMLAnchorElement>) {
  return <NavLink to={props["href"]} {...props} />;
}

function renderHeader(tagName: string) {
  return function renderHeaderInner(
    props: React.HTMLAttributes<HTMLHeadingElement>,
  ) {
    const children = React.Children.toArray(props.children);
    const text = children.reduce(flatten, "");
    const slug = text.toLowerCase().replace(/\W/g, "-");
    return React.createElement(tagName, { id: slug }, props.children);
  };
}

export default function AboutPage() {
  const { currentLocale } = useApp();

  return (
    <Layout>
      {currentLocale !== "en-US" && (
        <WarningMessage data-testid={TESTID_ABOUT_PAGE_LANGUAGE_WARNING}>
          <Translation id="onlyAvailableInEnglish" />
        </WarningMessage>
      )}
      <Content>
        <ReactMarkdown
          components={{
            a: renderLink,
            h2: renderHeader("h2"),
            h3: renderHeader("h3"),
            h4: renderHeader("h4"),
          }}
        >
          {readmeMarkdown}
        </ReactMarkdown>
      </Content>
    </Layout>
  );
}
