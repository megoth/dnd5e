import React from "react";
import Layout from "../layout";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import Loading from "../loading";
import { ClassShapeType } from "../../ldo/dnd5e.shapeTypes";
import { NavLink } from "react-router-dom";
import useListOfType from "../../hooks/useListOfType";
import Content from "../content";
import Markdown from "react-markdown";
import Illustration from "../illustration";
import Logo from "../logo";
import { useNavigate } from "react-router";
import { description } from "../../utils/dnd5e";
import { bem } from "../../utils/bem";

export default function ClassesPage() {
  const navigate = useNavigate();
  const { isLoading, items: classes } = useListOfType(
    ClassShapeType,
    "classes",
    "Class",
  );

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Content>
        <h1>
          <Translation id="classesPageTitle" /> ({classes.length})
        </h1>
        {isLoading && <Loading />}
      </Content>
      {!isLoading && (
        <ul className="cards">
          {classes
            .sort((a, b) => (a.label > b.label ? 1 : -1))
            .map((classInfo) => (
              <li
                key={classInfo["@id"]}
                className={bem("card", "clickable")}
                onClick={(event) => {
                  if ((event.target as HTMLElement).nodeName === "A") return;
                  return navigate(`/classes/${btoa(classInfo["@id"])}`);
                }}
              >
                <Content>
                  {classInfo.illustration ? (
                    <Illustration
                      className="card__media"
                      subject={classInfo.illustration}
                      modifier="compact"
                    />
                  ) : (
                    <Logo className="card__media hidden md:block" />
                  )}
                </Content>
                <div className="card__content">
                  <h2 className="card__title">
                    <NavLink to={`/classes/${btoa(classInfo["@id"])}`}>
                      {classInfo.label}
                    </NavLink>
                  </h2>
                  {classInfo.description && (
                    <Content>
                      <Markdown>{description(classInfo.description)}</Markdown>
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
