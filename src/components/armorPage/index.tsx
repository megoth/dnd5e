import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import useListOfType from "../../hooks/useListOfType";
import { EquipmentShapeType } from "../../ldo/dnd5e.shapeTypes";
import Loading from "../loading";
import { bem } from "../../utils/bem";
import { parseNumber } from "../../utils/dnd5e";
import { first, removeDuplicates } from "../../utils/array";
import { NavLink, useSearchParams } from "react-router-dom";
import useMergeQuery from "../../hooks/useMergeQuery";
import useReduceQuery from "../../hooks/useReduceQuery";

export default function ArmorPage() {
  const { isLoading, items: equipments } = useListOfType(
    EquipmentShapeType,
    "equipments",
    "Equipment",
  );

  const armor = equipments.filter((equipment) => !!equipment.armor);
  const categories = removeDuplicates(
    armor.map((equipment) => equipment.armor.armorCategory),
  );
  const [searchParams] = useSearchParams();
  const categoryFilter = first(searchParams.get("category"));

  const mergeQuery = useMergeQuery();
  const reduceQuery = useReduceQuery();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Content>
        <h1>
          <Translation id="armor" />
        </h1>
        <dl className="filter-list">
          <dt>
            <Translation id="category" />
          </dt>
          <dd>
            {categories.map((category) => {
              const active = categoryFilter && categoryFilter === category;
              return (
                <NavLink
                  key={category}
                  to={
                    active
                      ? reduceQuery("category")
                      : mergeQuery({
                          category,
                        })
                  }
                  aria-selected={active}
                >
                  {category}
                </NavLink>
              );
            })}
          </dd>
        </dl>
        <div className="table-container">
          <table className={bem("table", "compact")}>
            <thead>
              <tr>
                <th scope="col">
                  <Translation id="name" />
                </th>
                <th scope="col">
                  <Translation id="armorClass" />
                </th>
                <th scope="col">
                  <Translation id="strength" />
                </th>
                <th scope="col">
                  <Translation id="stealth" />
                </th>
                <th scope="col">
                  <Translation id="weight" />
                </th>
                <th scope="col">
                  <Translation id="cost" />
                </th>
              </tr>
            </thead>
            <tbody>
              {armor
                .filter((equipment) =>
                  categoryFilter
                    ? equipment.armor.armorCategory === categoryFilter
                    : true,
                )
                .map((equipment) => (
                  <tr key={equipment["@id"]}>
                    <td>{equipment.label}</td>
                    <td className="whitespace-nowrap">
                      {equipment.armor.armorClass.base}
                      {equipment.armor.armorClass.dexBonus && (
                        <>
                          {" "}
                          + <Translation id="dexModifier" />
                        </>
                      )}
                      {equipment.armor.armorClass.maxBonus && (
                        <>
                          {" "}
                          (<Translation id="max" />{" "}
                          {equipment.armor.armorClass.maxBonus})
                        </>
                      )}
                    </td>
                    <td>{parseNumber(equipment.armor.strMinimum)}</td>
                    <td>
                      {equipment.armor.stealthDisadvantage && (
                        <Translation id="disadvantage" />
                      )}
                    </td>
                    <td>{equipment.armor.weight} lb.</td>
                    <td className="whitespace-nowrap">
                      {equipment.cost.quantity} {equipment.cost.unit}
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
