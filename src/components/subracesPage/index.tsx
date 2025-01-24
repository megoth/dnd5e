import React from "react";
import Layout from "../layout";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import Loading from "../loading";
import { SubraceShapeType } from "../../ldo/dnd5e.shapeTypes";
import { NavLink } from "react-router-dom";
import useListOfType from "../../hooks/useListOfType";
import Content from "../content";
import Markdown from "react-markdown";
import Illustration from "../illustration";
import Logo from "../logo";
import { useNavigate } from "react-router";
import Breadcrumbs from "../breadcrumbs";
import { bem } from "../../utils/bem";

export default function SubracesPage() {
  const navigate = useNavigate();
  const { isLoading, items: subraces } = useListOfType(
    SubraceShapeType,
    "races",
    "Subrace",
  );

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Breadcrumbs
        crumbs={[
          { href: "/races", translationId: "races" },
          { translationId: "subraces" },
        ]}
      />
      <Content>
        <h1>
          <Translation id="subraces" /> ({subraces.length})
        </h1>
        {isLoading && <Loading />}
      </Content>
      {!isLoading && (
        <ul className="cards">
          {subraces
            .sort((a, b) => (a.label > b.label ? 1 : -1))
            .map((subrace) => (
              <li
                key={subrace["@id"]}
                className={bem("card", "clickable")}
                onClick={(event) => {
                  if ((event.target as HTMLElement).nodeName === "A") return;
                  return navigate(
                    `/races/${btoa(subrace.race["@id"])}#${btoa(subrace["@id"])}`,
                  );
                }}
              >
                <Content>
                  {subrace.illustration ? (
                    <Illustration
                      className="card__media"
                      subject={subrace.illustration}
                      modifier="compact"
                    />
                  ) : (
                    <Logo className="card__media hidden md:block" />
                  )}
                </Content>
                <div className="card__content">
                  <h2 className="card__title">
                    <NavLink
                      to={`/races/${btoa(subrace.race["@id"])}#${btoa(subrace["@id"])}`}
                    >
                      {subrace.label}
                    </NavLink>
                  </h2>
                  {subrace.description && (
                    <Content>
                      <Markdown>{subrace.description}</Markdown>
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
