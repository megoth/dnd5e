import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import useListOfType from "../../hooks/useListOfType";
import { SpellShapeType } from "../../ldo/dnd5e.shapeTypes";
import Loading from "../loading";
import { NavLink } from "react-router-dom";
import { useLocalization } from "@fluent/react";
import { spellDuration } from "../../utils/dnd5e";
import { bem } from "../../utils/bem";

export default function SpellsPage() {
  const { l10n } = useLocalization();
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
      <WarningMessage>
        <Translation id="workInProgress" />
      </WarningMessage>
      <Content>
        <h1>
          <Translation id="spellsPageTitle" />
        </h1>
        <div className="table-container">
          <table className={bem("table", "compact")}>
            <thead>
              <tr>
                <th scope="col">
                  <Translation id="name" />
                </th>
                <th scope="col">
                  <Translation id="level" />
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
                  <td>
                    <NavLink to={`/spells/${btoa(spell["@id"])}`}>
                      {spell.label}
                    </NavLink>
                  </td>
                  <td>{l10n.getString(`order${spell.level}`)}</td>
                  <td>{spell.magicSchool.label}</td>
                  <td>{spell.castingTime}</td>
                  <td>{spell.spellRange}</td>
                  <td>{spellDuration(spell, l10n)}</td>
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
