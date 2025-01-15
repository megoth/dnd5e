import React, { useMemo } from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import useListOfType from "../../hooks/useListOfType";
import {
  EquipmentCategoryShapeType,
  EquipmentShapeType,
} from "../../ldo/dnd5e.shapeTypes";
import Loading from "../loading";
import { NavLink, useSearchParams } from "react-router-dom";
import { first, removeDuplicates } from "../../utils/array";
import useMergeQuery from "../../hooks/useMergeQuery";
import useReduceQuery from "../../hooks/useReduceQuery";
import { cost } from "../../utils/dnd5e";

export default function EquipmentIndexPage() {
  const { isLoading: equipmentsLoading, items: equipments } = useListOfType(
    EquipmentShapeType,
    "equipments",
    "Equipment",
  );
  const categoryIds = useMemo(
    () =>
      removeDuplicates(
        equipments.map((equipment) => equipment.equipmentCategory["@id"]),
      ),
    [equipments],
  );

  const { isLoading: categoriesLoading, items: categories } = useListOfType(
    EquipmentCategoryShapeType,
    "equipments",
    "EquipmentCategory",
  );
  const [searchParams] = useSearchParams();
  const categoryFilter = first(searchParams.get("category"));
  const categoryFilterDecoded = categoryFilter && atob(categoryFilter);

  const mergeQuery = useMergeQuery();
  const reduceQuery = useReduceQuery();

  const isLoading = equipmentsLoading || categoriesLoading;

  const filteredEquipment = equipments
    .filter((equipment) =>
      categoryFilterDecoded
        ? equipment.equipmentCategory["@id"] === categoryFilterDecoded
        : true,
    )
    .sort((a, b) => (a.label > b.label ? 1 : -1));

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Content>
        <h1>
          <Translation id="equipmentPageTitle" /> ({filteredEquipment.length})
        </h1>
        {isLoading && <Loading />}
        {!isLoading && (
          <dl className="filter-list">
            <dt>
              <Translation id="category" />
            </dt>
            <dd>
              {categories
                .filter(
                  (category) => categoryIds.indexOf(category["@id"]) !== -1,
                )
                .sort((a, b) => (a.label > b.label ? 1 : -1))
                .map((category) => {
                  const active =
                    categoryFilter && categoryFilterDecoded === category["@id"];
                  return (
                    <NavLink
                      key={category["@id"]}
                      to={
                        active
                          ? reduceQuery("category")
                          : mergeQuery({
                              category: btoa(category["@id"]),
                            })
                      }
                      aria-selected={active}
                    >
                      {category.label}
                    </NavLink>
                  );
                })}
            </dd>
          </dl>
        )}
        {!isLoading && (
          <div className="table-container">
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
                {filteredEquipment.map((equipment) => (
                  <tr key={equipment["@id"]} id={btoa(equipment["@id"])}>
                    <td>
                      {equipment.armor && (
                        <NavLink to={`/armor/${btoa(equipment["@id"])}`}>
                          {equipment.label}
                        </NavLink>
                      )}
                      {equipment.magicItem && (
                        <NavLink to={`/magic-items/${btoa(equipment["@id"])}`}>
                          {equipment.label}
                        </NavLink>
                      )}
                      {equipment.weapon && (
                        <NavLink to={`/weapons/${btoa(equipment["@id"])}`}>
                          {equipment.label}
                        </NavLink>
                      )}
                      {!(
                        equipment.armor ||
                        equipment.weapon ||
                        equipment.magicItem
                      ) && (
                        <NavLink to={`/equipment/${btoa(equipment["@id"])}`}>
                          {equipment.label}
                        </NavLink>
                      )}
                    </td>
                    <td className="whitespace-nowrap">
                      {cost(equipment.cost)}
                    </td>
                    <td>{equipment.equipmentCategory.label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Content>
    </Layout>
  );
}
