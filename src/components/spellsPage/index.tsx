import React, { useCallback } from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import useListOfType from "../../hooks/useListOfType";
import {
  ClassShapeType,
  MagicSchoolShapeType,
  SpellShapeType,
} from "../../ldo/dnd5e.shapeTypes";
import Loading from "../loading";
import { NavLink, useSearchParams } from "react-router-dom";
import { useLocalization } from "@fluent/react";
import { classHasSpellcasting, spellDuration } from "../../utils/dnd5e";
import { bem } from "../../utils/bem";
import { first } from "../../utils/array";

export default function SpellsPage() {
  const { l10n } = useLocalization();
  const { isLoading: spellsLoading, items: spells } = useListOfType(
    SpellShapeType,
    "spells",
    "Spell",
  );
  const { isLoading: schoolsLoading, items: schools } = useListOfType(
    MagicSchoolShapeType,
    "spells",
    "MagicSchool",
  );
  const { isLoading: classesLoading, items: classes } = useListOfType(
    ClassShapeType,
    "classes",
    "Class",
  );
  const [searchParams] = useSearchParams();
  const classFilter = first(searchParams.get("class"));
  const classFilterDecoded = classFilter && atob(classFilter);
  const levelFilter = parseInt(first(searchParams.get("level")), 10);
  const schoolFilter = first(searchParams.get("school"));
  const schoolFilterDecoded = schoolFilter && atob(schoolFilter);

  const mergeQuery = useCallback(
    (query: Record<string, string | string[]>): string => {
      const queries = searchParams.entries().reduce(
        (params, [key, value]) => ({
          ...params,
          [key]: value,
        }),
        {} as Record<string, Array<string>>,
      );
      return `?${Object.entries({
        ...queries,
        ...query,
      })
        .map(([key, value]) => `${key}=${value}`)
        .join("&")}`;
    },
    [searchParams],
  );

  const reduceQuery = useCallback(
    (...keys: string[]) => {
      const queries = searchParams.entries().reduce(
        (params, [key, value]) =>
          keys.indexOf(key) === -1
            ? {
                ...params,
                [key]: value,
              }
            : params,
        {} as Record<string, Array<string>>,
      );
      return `?${Object.entries(queries)
        .map(([key, value]) => `${key}=${value}`)
        .join("&")}`;
    },
    [searchParams],
  );

  if (spellsLoading || classesLoading || schoolsLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Content>
        <h1>
          <Translation id="spellsPageTitle" />
        </h1>
        <dl className="filter-list">
          <dt>
            <Translation id="class" />
          </dt>
          <dd>
            {classes.filter(classHasSpellcasting).map((classInfo) => {
              const active =
                classFilter && classFilterDecoded === classInfo["@id"];
              return (
                <NavLink
                  key={classInfo["@id"]}
                  to={
                    active
                      ? reduceQuery("class")
                      : mergeQuery({
                          class: btoa(classInfo["@id"]),
                        })
                  }
                  aria-selected={active}
                >
                  {classInfo.label}
                </NavLink>
              );
            })}
          </dd>
          <dt>
            <Translation id="level" />
          </dt>
          <dd>
            {Array.from({ length: 10 }).map((_, level) => {
              const active = levelFilter && levelFilter === level;
              return (
                <NavLink
                  key={level}
                  to={
                    active
                      ? reduceQuery("level")
                      : mergeQuery({ level: level.toString() })
                  }
                  aria-selected={active}
                >
                  {level}
                </NavLink>
              );
            })}
          </dd>
          <dt>
            <Translation id="school" />
          </dt>
          <dd>
            {schools.map((school) => {
              const active =
                schoolFilter && schoolFilterDecoded === school["@id"];
              return (
                <NavLink
                  key={school["@id"]}
                  to={
                    active
                      ? reduceQuery("school")
                      : mergeQuery({ school: btoa(school["@id"]) })
                  }
                  aria-selected={active}
                >
                  {school.label}
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
              {spells
                .filter(
                  (spell) =>
                    (classFilterDecoded
                      ? !!spell.classes.find(
                          (classInfo) =>
                            classInfo["@id"] === classFilterDecoded,
                        )
                      : true) &&
                    (levelFilter ? spell.level === levelFilter : true) &&
                    (schoolFilterDecoded
                      ? spell.magicSchool["@id"] === schoolFilterDecoded
                      : true),
                )
                .map((spell) => (
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
