import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import useListOfType from "../../hooks/useListOfType";
import { SpellShapeType } from "../../ldo/dnd5e.shapeTypes";
import Loading from "../loading";

export default function SpellsPage() {
  const { isLoading, items: spells } = useListOfType(
    SpellShapeType,
    "spells",
    "Spell",
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout pageName={"spellsPageTitle"}>
      <Content>
        <h1>
          <Translation id="spellsPageTitle" />
        </h1>
        <WarningMessage>
          <Translation id="workInProgress" />
        </WarningMessage>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  <Translation id="name" />
                </th>
                <th scope="col">
                  <Translation id="school" />
                </th>
                <th scope="col">
                  <Translation id="castingTime" />
                </th>
                <th scope="col">
                  <Translation id="range" />
                </th>
                <th scope="col">
                  <Translation id="duration" />
                </th>
                <th scope="col">
                  <Translation id="components" />
                </th>
              </tr>
            </thead>
            <tbody>
              {spells.map((spell) => (
                <tr key={spell["@id"]}>
                  <td>{spell.label}</td>
                  <td>{spell.magicSchool.label}</td>
                  <td>{spell.castingTime}</td>
                  <td>{spell.spellRange}</td>
                  <td>{spell.duration}</td>
                  <td>{spell.components.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Content>
    </Layout>
  );
}
