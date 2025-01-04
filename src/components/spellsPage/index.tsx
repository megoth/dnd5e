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
                <th scope="col">Name</th>
              </tr>
            </thead>
            <tbody>
              {spells.map((spell) => (
                <tr key={spell["@id"]}>
                  <td>{spell.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Content>
    </Layout>
  );
}
