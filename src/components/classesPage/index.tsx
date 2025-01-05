import React from "react";
import Layout from "../layout";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import Loading from "../loading";
import { ClassShapeType } from "../../ldo/dnd5e.shapeTypes";
import { NavLink } from "react-router-dom";
import useListOfType from "../../hooks/useListOfType";
import Content from "../content";

export default function ClassesPage() {
  const { isLoading, items: classes } = useListOfType(
    ClassShapeType,
    "classes",
    "Class",
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout pageName="classesPageTitle">
      <WarningMessage>
        <Translation id="workInProgress" />
      </WarningMessage>
      <Content>
        <h1>
          <Translation id="classesPageTitle" />
        </h1>
      </Content>
      <div className="nav-group">
        {classes.map((adventureClass) => (
          <NavLink
            key={adventureClass["@id"]}
            to={`/classes/${btoa(adventureClass["@id"])}`}
            className="nav-group__link"
          >
            {adventureClass.label}
          </NavLink>
        ))}
      </div>
    </Layout>
  );
}
