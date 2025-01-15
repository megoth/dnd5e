import React, { Fragment } from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import useListOfType from "../../hooks/useListOfType";
import { RuleShapeType } from "../../ldo/dnd5e.shapeTypes";
import Loading from "../loading";
import Markdown from "react-markdown";
import { description } from "../../utils/dnd5e";
import remarkGfm from "remark-gfm";
import { NavLink } from "react-router-dom";

export default function RulesPage() {
  const { isLoading, items: rules } = useListOfType(
    RuleShapeType,
    "rules",
    "Rule",
  );

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Content>
        <h1>
          <Translation id="rulesPageTitle" /> (
          {rules.length + rules.flatMap((rule) => rule.ruleSections).length})
        </h1>
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            <ol>
              {rules.map((rule) => (
                <li key={`toc-${rule["@id"]}`}>
                  <NavLink to={`/rules#${btoa(rule["@id"])}`}>
                    {rule.label}
                  </NavLink>
                  {rule.ruleSections && (
                    <ol>
                      {rule.ruleSections.map((section) => (
                        <li key={`toc-${section["@id"]}`}>
                          <NavLink to={`/rules#${btoa(section["@id"])}`}>
                            {section.label}
                          </NavLink>
                        </li>
                      ))}
                    </ol>
                  )}
                </li>
              ))}
            </ol>
            {rules.map((rule) => (
              <div key={rule["@id"]} id={btoa(rule["@id"])}>
                <Markdown remarkPlugins={[remarkGfm]}>
                  {description(rule.description)}
                </Markdown>
                {rule.ruleSections.map((section) => (
                  <div key={section["@id"]} id={btoa(section["@id"])}>
                    <Markdown remarkPlugins={[remarkGfm]}>
                      {description(section.description)}
                    </Markdown>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </Content>
    </Layout>
  );
}
