import React, { Fragment } from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import useListOfType from "../../hooks/useListOfType";
import {
  EquipmentShapeType,
  WeaponPropertyShapeType,
} from "../../ldo/dnd5e.shapeTypes";
import Loading from "../loading";
import { NavLink, useSearchParams } from "react-router-dom";
import { first, removeDuplicates } from "../../utils/array";
import useMergeQuery from "../../hooks/useMergeQuery";
import useReduceQuery from "../../hooks/useReduceQuery";
import Breadcrumbs from "../breadcrumbs";
import { cost, weight } from "../../utils/dnd5e";

export default function WeaponsPage() {
  const { isLoading: equipmentsLoading, items: equipments } = useListOfType(
    EquipmentShapeType,
    "equipments",
    "Equipment",
  );
  const { isLoading: propertiesLoading, items: properties } = useListOfType(
    WeaponPropertyShapeType,
    "equipments",
    "WeaponProperty",
  );

  const weapons = equipments.filter((equipment) => !!equipment.weapon);
  const ranges = removeDuplicates(
    weapons.map((equipment) => equipment.weapon.weaponRange),
  );
  const categories = removeDuplicates(
    weapons.map((equipment) => equipment.weapon.weaponCategory),
  );
  const propertyIds = removeDuplicates(
    weapons.flatMap((equipment) =>
      equipment.weapon.properties.map((property) => property["@id"]),
    ),
  );

  const [searchParams] = useSearchParams();
  const rangeFilter = first(searchParams.get("range"));
  const categoryFilter = first(searchParams.get("category"));
  const propertyFilter = first(searchParams.get("property"));
  const propertyFilterDecoded = propertyFilter && atob(propertyFilter);

  const mergeQuery = useMergeQuery();
  const reduceQuery = useReduceQuery();

  const isLoading = equipmentsLoading || propertiesLoading;

  const filteredWeapons = weapons
    .filter(
      (equipment) =>
        (categoryFilter
          ? equipment.weapon.weaponCategory === categoryFilter
          : true) &&
        (propertyFilterDecoded
          ? !!equipment.weapon.properties.find(
              (property) => property["@id"] === propertyFilterDecoded,
            )
          : true) &&
        (rangeFilter ? equipment.weapon.weaponRange === rangeFilter : true),
    )
    .sort((a, b) => (a.label > b.label ? 1 : -1));

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Breadcrumbs
        crumbs={[
          { href: "/equipment", translationId: "equipment" },
          { translationId: "weapons" },
        ]}
      />
      <Content>
        <h1>
          <Translation id="weapons" /> ({filteredWeapons.length})
        </h1>
        {isLoading && <Loading />}
        {!isLoading && (
          <dl className="filter-list">
            <dt>
              <Translation id="range" />
            </dt>
            <dd>
              {ranges.map((range) => {
                const active = rangeFilter === range;
                return (
                  <NavLink
                    key={range}
                    to={active ? reduceQuery("range") : mergeQuery({ range })}
                    aria-selected={active}
                  >
                    {range}
                  </NavLink>
                );
              })}
            </dd>
            <dt>
              <Translation id="category" />
            </dt>
            <dd>
              {categories.map((category) => {
                const active = categoryFilter === category;
                return (
                  <NavLink
                    key={category}
                    to={
                      active
                        ? reduceQuery("category")
                        : mergeQuery({ category })
                    }
                    aria-selected={active}
                  >
                    {category}
                  </NavLink>
                );
              })}
            </dd>
            <dt>
              <Translation id="properties" />
            </dt>
            <dd>
              {properties
                .filter(
                  (property) => propertyIds.indexOf(property["@id"]) !== -1,
                )
                .map((property) => {
                  const active = propertyFilterDecoded === property["@id"];
                  return (
                    <NavLink
                      key={property["@id"]}
                      to={
                        active
                          ? reduceQuery("property")
                          : mergeQuery({ property: btoa(property["@id"]) })
                      }
                      aria-selected={active}
                    >
                      {property.label}
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
                {filteredWeapons.map((equipment) => (
                  <tr key={equipment["@id"]}>
                    <td>
                      <NavLink to={`/weapons/${btoa(equipment["@id"])}`}>
                        {equipment.label}
                      </NavLink>
                    </td>
                    <td className="whitespace-nowrap">
                      {cost(equipment.cost)}
                    </td>
                    <td className="whitespace-nowrap">
                      {equipment.weapon.damage?.dice}{" "}
                      {equipment.weapon.damage?.damageType.label}
                    </td>
                    <td className="whitespace-nowrap">
                      {weight(equipment.weapon.weight)}
                    </td>
                    <td>
                      {equipment.weapon.properties
                        .map((property) => property.label)
                        .join(", ")}
                    </td>
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
