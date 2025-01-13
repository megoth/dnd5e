import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import useListOfType from "../../hooks/useListOfType";
import { EquipmentShapeType } from "../../ldo/dnd5e.shapeTypes";
import Loading from "../loading";
import { armorClass, parseNumber } from "../../utils/dnd5e";
import { first, removeDuplicates } from "../../utils/array";
import { NavLink, useSearchParams } from "react-router-dom";
import useMergeQuery from "../../hooks/useMergeQuery";
import useReduceQuery from "../../hooks/useReduceQuery";
import Breadcrumbs from "../breadcrumbs";
import { useLocalization } from "@fluent/react";

export default function ArmorIndexPage() {
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

  const { l10n } = useLocalization();

  if (isLoading) {
    return <Loading />;
  }

  const filteredArmor = armor.filter((equipment) =>
    categoryFilter ? equipment.armor.armorCategory === categoryFilter : true,
  );

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Breadcrumbs
        crumbs={[
          { href: "/equipment", translationId: "equipment" },
          { translationId: "armor" },
        ]}
      />
      <Content>
        <h1>
          <Translation id="armor" /> ({filteredArmor.length})
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
          <table className="table">
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
              {filteredArmor.map((equipment) => (
                <tr key={equipment["@id"]} id={btoa(equipment["@id"])}>
                  <td>
                    <NavLink to={`/armor/${btoa(equipment["@id"])}`}>
                      {equipment.label}
                    </NavLink>
                  </td>
                  <td className="whitespace-nowrap">
                    {armorClass(equipment.armor.armorClass, l10n)}
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
