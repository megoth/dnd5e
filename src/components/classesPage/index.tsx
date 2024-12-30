import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import Loading from "../loading";
import { ClassShapeType } from "../../ldo/dnd5e.shapeTypes";
import { NavLink } from "react-router-dom";
import useListOfType from "../../hooks/useListOfType";

export default function ClassesPage() {
  const { isLoading, items: classes } = useListOfType(ClassShapeType);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout pageName="classesPageTitle">
      <Content>
        <h1>
          <Translation id="classesPageTitle" />
        </h1>
        <WarningMessage>
          <Translation id="workInProgress" />
        </WarningMessage>

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
      </Content>
    </Layout>
  );
}
