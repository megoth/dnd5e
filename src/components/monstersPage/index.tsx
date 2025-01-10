import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import useListOfType from "../../hooks/useListOfType";
import { MonsterShapeType } from "../../ldo/dnd5e.shapeTypes";
import Loading from "../loading";
import { bem } from "../../utils/bem";
import { NavLink } from "react-router-dom";

export default function MonstersPage() {
  const { isLoading, items: monsters } = useListOfType(
    MonsterShapeType,
    "monsters",
    "Monster",
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Content>
        <h1>
          <Translation id="monstersPageTitle" />
        </h1>
        <div className="table-container">
          <table className={bem("table")}>
            <thead>
              <tr>
                <th scope="col">
                  <Translation id="name" />
                </th>
                <th scope="col">
                  <Translation id="size" />
                </th>
                <th scope="col">
                  <Translation id="type" />
                </th>
              </tr>
            </thead>
            <tbody>
              {monsters.map((monster) => (
                <tr key={monster["@id"]}>
                  <td>
                    <NavLink to={`/monsters/${btoa(monster["@id"])}`}>
                      {monster.label}
                    </NavLink>
                  </td>
                  <td>{monster.size}</td>
                  <td>
                    {monster.ofType}
                    {monster.subtype ? ` (${monster.subtype})` : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Content>
    </Layout>
  );
}
