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

export default function ClassesPage() {
  const navigate = useNavigate();
  const { isLoading, items: classes } = useListOfType(
    ClassShapeType,
    "classes",
    "Class",
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Content>
        <h1>
          <Translation id="classesPageTitle" />
        </h1>
      </Content>
      <ul className="cards">
        {classes.map((classInfo) => (
          <li
            key={classInfo["@id"]}
            className="card"
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
                <Logo className="card__media" />
              )}
            </Content>
            <div className="card__content">
              <h2 className="card__title">
                <NavLink to={`/classes/${btoa(classInfo["@id"])}`}>
                  {classInfo.label}
                </NavLink>
              </h2>
              {classInfo.description && (
                <Markdown>{classInfo.description.join("\n\n")}</Markdown>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
