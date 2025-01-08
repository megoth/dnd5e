import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import useListOfType from "../../hooks/useListOfType";
import { EquipmentShapeType } from "../../ldo/dnd5e.shapeTypes";
import Loading from "../loading";

export default function EquipmentPage() {
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
          <Translation id="equipmentPageTitle" />
        </h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                <Translation id="name" />
              </th>
              <th scope="col">
                <Translation id="cost" />
              </th>
              <th scope="col">
                <Translation id="category" />
              </th>
            </tr>
          </thead>
          <tbody>
            {equipments.map((equipment) => (
              <tr key={equipment["@id"]}>
                <td>{equipment.label}</td>
                <td>
                  {equipment.cost.quantity} {equipment.cost.unit}
                </td>
                <td>{equipment.equipmentCategory.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Content>
    </Layout>
  );
}
