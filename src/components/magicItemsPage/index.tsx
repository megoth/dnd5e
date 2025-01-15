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
import Breadcrumbs from "../breadcrumbs";

export default function MagicItemsPage() {
  const { isLoading: equipmentsLoading, items: equipments } = useListOfType(
    EquipmentShapeType,
    "equipments",
    "Equipment",
  );
  const magicItems = equipments.filter((equipment) => equipment.magicItem);
  const categoryIds = useMemo(
    () =>
      removeDuplicates(
        magicItems.map((equipment) => equipment.equipmentCategory["@id"]),
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

  const filteredItems = magicItems
    .filter((item) =>
      categoryFilterDecoded
        ? item.equipmentCategory["@id"] === categoryFilterDecoded
        : true,
    )
    .sort((a, b) => (a.label > b.label ? 1 : -1));

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Breadcrumbs
        crumbs={[
          { href: "/equipment", translationId: "equipment" },
          { translationId: "magicItems" },
        ]}
      />
      <Content>
        <h1>
          <Translation id="magicItems" /> ({filteredItems.length})
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
                  const active = category["@id"] === categoryFilterDecoded;
                  return (
                    <NavLink
                      key={category["@id"]}
                      to={
                        active
                          ? reduceQuery("category")
                          : mergeQuery({ category: btoa(category["@id"]) })
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
                    <Translation id="category" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((equipment) => (
                  <tr key={equipment["@id"]}>
                    <td>
                      <NavLink to={`/magic-items/${btoa(equipment["@id"])}`}>
                        {equipment.label}
                      </NavLink>
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
