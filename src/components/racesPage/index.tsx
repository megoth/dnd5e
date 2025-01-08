import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import useListOfType from "../../hooks/useListOfType";
import { RaceShapeType } from "../../ldo/dnd5e.shapeTypes";
import Loading from "../loading";
import { NavLink } from "react-router-dom";

export default function RacesPage() {
  const { isLoading, items: races } = useListOfType(
    RaceShapeType,
    "races",
    "Race",
  );

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Content>
        <h1>
          <Translation id="racesPageTitle" />
        </h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                <Translation id="name" />
              </th>
            </tr>
          </thead>
          <tbody>
            {races.map((race) => (
              <tr key={race["@id"]}>
                <td>
                  <NavLink to={`/races/${btoa(race["@id"])}`}>
                    {race.label}
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Content>
    </Layout>
  );
}
