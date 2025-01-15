import React from "react";
import Layout from "../layout";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import Loading from "../loading";
import { SubclassShapeType } from "../../ldo/dnd5e.shapeTypes";
import { NavLink } from "react-router-dom";
import useListOfType from "../../hooks/useListOfType";
import Content from "../content";
import Markdown from "react-markdown";
import Illustration from "../illustration";
import Logo from "../logo";
import { useNavigate } from "react-router";
import { description } from "../../utils/dnd5e";
import Breadcrumbs from "../breadcrumbs";
import { bem } from "../../utils/bem";

export default function SubclassesPage() {
  const navigate = useNavigate();
  const { isLoading, items: subclasses } = useListOfType(
    SubclassShapeType,
    "classes",
    "Subclass",
  );

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Breadcrumbs
        crumbs={[
          { href: "/classes", translationId: "classes" },
          { translationId: "subclasses" },
        ]}
      />
      <Content>
        <h1>
          <Translation id="subclasses" /> ({subclasses.length})
        </h1>
        {isLoading && <Loading />}
      </Content>
      {!isLoading && (
        <ul className="cards">
          {subclasses
            .sort((a, b) => (a.label > b.label ? 1 : -1))
            .map((subclass) => (
              <li
                key={subclass["@id"]}
                className={bem("card", "clickable")}
                onClick={(event) => {
                  if ((event.target as HTMLElement).nodeName === "A") return;
                  return navigate(
                    `/classes/${btoa(subclass.class["@id"])}#${btoa(subclass["@id"])}`,
                  );
                }}
              >
                <Content>
                  {subclass.illustration ? (
                    <Illustration
                      className="card__media"
                      subject={subclass.illustration}
                      modifier="compact"
                    />
                  ) : (
                    <Logo className="card__media hidden md:block" />
                  )}
                </Content>
                <div className="card__content">
                  <h2 className="card__title">
                    <NavLink
                      to={`/classes/${btoa(subclass.class["@id"])}#${btoa(subclass["@id"])}`}
                    >
                      {subclass.label}
                    </NavLink>
                  </h2>
                  {subclass.description && (
                    <Content>
                      <Markdown>{description(subclass.description)}</Markdown>
                    </Content>
                  )}
                </div>
              </li>
            ))}
        </ul>
      )}
    </Layout>
  );
}
