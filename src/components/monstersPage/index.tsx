import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import useListOfType from "../../hooks/useListOfType";
import { MonsterShapeType } from "../../ldo/dnd5e.shapeTypes";
import Loading from "../loading";
import { NavLink, useSearchParams } from "react-router-dom";
import { first, removeDuplicates } from "../../utils/array";
import useMergeQuery from "../../hooks/useMergeQuery";
import useReduceQuery from "../../hooks/useReduceQuery";
import { monsterChallenge, monsterType } from "../../utils/dnd5e";

export default function MonstersPage() {
  const { isLoading, items: monsters } = useListOfType(
    MonsterShapeType,
    "monsters",
    "Monster",
  );

  const sizes = ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"];
  const types = removeDuplicates(
    monsters.map((monster) => monster.ofType),
  ).sort((a, b) => (a > b ? 1 : -1));
  const challengeRatings = removeDuplicates(
    monsters.map((monster) => monster.challengeRating),
  ).sort((a, b) => a - b);

  const [searchParams] = useSearchParams();
  const sizeFilter = first(searchParams.get("size"));
  const typeFilter = first(searchParams.get("type"));
  const challengeFilter = first(searchParams.get("challenge"));

  const mergeQuery = useMergeQuery();
  const reduceQuery = useReduceQuery();

  if (isLoading) {
    return <Loading />;
  }

  const filteredMonsters = monsters
    .filter(
      (monster) =>
        (sizeFilter ? monster.size === sizeFilter : true) &&
        (typeFilter ? monster.ofType === typeFilter : true) &&
        (challengeFilter
          ? monster.challengeRating.toString() === challengeFilter
          : true),
    )
    .sort((a, b) => (a.label > b.label ? 1 : -1));

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Content>
        <h1>
          <Translation id="monstersPageTitle" /> ({filteredMonsters.length})
        </h1>
        <dl className="filter-list">
          <dt>
            <Translation id="size" />
          </dt>
          <dd>
            {sizes.map((size) => {
              const active = sizeFilter && sizeFilter === size;
              return (
                <NavLink
                  key={size}
                  to={active ? reduceQuery("size") : mergeQuery({ size })}
                  aria-selected={active}
                >
                  {size}
                </NavLink>
              );
            })}
          </dd>
          <dt>
            <Translation id="type" />
          </dt>
          <dd>
            {types.map((type) => {
              const active = typeFilter && typeFilter === type;
              return (
                <NavLink
                  key={type}
                  to={active ? reduceQuery("type") : mergeQuery({ type })}
                  aria-selected={active}
                >
                  {type}
                </NavLink>
              );
            })}
          </dd>
          <dt>
            <Translation id="challenge" />
          </dt>
          <dd>
            {challengeRatings.map((challenge) => {
              const active = challengeFilter === challenge.toString();
              return (
                <NavLink
                  key={challenge}
                  to={
                    active
                      ? reduceQuery("challenge")
                      : mergeQuery({ challenge: challenge.toString() })
                  }
                  aria-selected={active}
                >
                  {challenge}
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
                  <Translation id="size" />
                </th>
                <th scope="col">
                  <Translation id="type" />
                </th>
                <th scope="col" className="whitespace-nowrap">
                  <Translation id="challenge" />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMonsters.map((monster) => (
                <tr key={monster["@id"]}>
                  <td>
                    <NavLink to={`/monsters/${btoa(monster["@id"])}`}>
                      {monster.label}
                    </NavLink>
                  </td>
                  <td>{monster.size}</td>
                  <td className="whitespace-nowrap">{monsterType(monster)}</td>
                  <td className="whitespace-nowrap">
                    {monsterChallenge(monster)}
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
