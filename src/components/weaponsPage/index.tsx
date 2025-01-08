import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import useListOfType from "../../hooks/useListOfType";
import { EquipmentShapeType } from "../../ldo/dnd5e.shapeTypes";
import Loading from "../loading";
import { bem } from "../../utils/bem";

export default function WeaponsPage() {
  const { isLoading, items: equipments } = useListOfType(
    EquipmentShapeType,
    "equipments",
    "Equipment",
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Content>
        <h1>
          <Translation id="weapons" />
        </h1>
        <table className={bem("table", "compact")}>
          <thead>
            <tr>
              <th scope="col">
                <Translation id="name" />
              </th>
              <th scope="col">
                <Translation id="cost" />
              </th>
              <th scope="col">
                <Translation id="damage" />
              </th>
              <th scope="col">
                <Translation id="weight" />
              </th>
              <th scope="col">
                <Translation id="properties" />
              </th>
            </tr>
          </thead>
          <tbody>
            {equipments
              .filter((equipment) => !!equipment.weapon)
              .map((equipment) => (
                <tr key={equipment["@id"]}>
                  <td>{equipment.label}</td>
                  <td>
                    {equipment.cost.quantity} {equipment.cost.unit}
                  </td>
                  <td>
                    {equipment.weapon.damage?.dice}{" "}
                    {equipment.weapon.damage?.damageType.label}
                  </td>
                  <td>{equipment.weapon.weight} lb.</td>
                  <td>
                    {equipment.weapon.properties
                      .map((property) => property.label)
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
