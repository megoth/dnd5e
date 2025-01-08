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
    <Layout>
      <WarningMessage id="workInProgress" />
      <Content>
        <h1>
          <Translation id="classesPageTitle" />
        </h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                <Translation id="name" />
              </th>
              <th scope="col">
                <Translation id="hitDie" />
              </th>
              <th scope="col">
                <Translation id="subclasses" />
              </th>
            </tr>
          </thead>
          <tbody>
            {classes.map((adventureClass) => (
              <tr key={adventureClass["@id"]}>
                <td>
                  <NavLink to={`/classes/${btoa(adventureClass["@id"])}`}>
                    {adventureClass.label}
                  </NavLink>
                </td>
                <td>d{adventureClass.hitDie}</td>
                <td>
                  {adventureClass.subclasses
                    .map((subclass) => subclass.label)
                    .join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Content>
    </Layout>
  );
}
