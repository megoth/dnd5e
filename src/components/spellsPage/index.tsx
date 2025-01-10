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
import useMergeQuery from "../../hooks/useMergeQuery";
import useReduceQuery from "../../hooks/useReduceQuery";

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

  const mergeQuery = useMergeQuery();
  const reduceQuery = useReduceQuery();

  if (spellsLoading || classesLoading || schoolsLoading) {
    return <Loading />;
  }

  const filteredSpells = spells.filter(
    (spell) =>
      (classFilterDecoded
        ? !!spell.classes.find(
            (classInfo) => classInfo["@id"] === classFilterDecoded,
          )
        : true) &&
      (levelFilter > -1 ? spell.level === levelFilter : true) &&
      (schoolFilterDecoded
        ? spell.magicSchool["@id"] === schoolFilterDecoded
        : true),
  );

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Content>
        <h1>
          <Translation id="spellsPageTitle" /> ({filteredSpells.length})
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
              const active = levelFilter > -1 && levelFilter === level;
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
                  {l10n.getString(`order${level}`)}
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
      </Content>
      <div className="table-container">
        <table className="table">
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
            {filteredSpells.map((spell) => (
              <tr key={spell["@id"]}>
                <td>
                  <NavLink to={`/spells/${btoa(spell["@id"])}`}>
                    {spell.label}
                  </NavLink>
                </td>
                <td>{l10n.getString(`order${spell.level}`)}</td>
                <td>{spell.magicSchool.label}</td>
                <td className="whitespace-nowrap">{spell.castingTime}</td>
                <td className="whitespace-nowrap">{spell.spellRange}</td>
                <td className="whitespace-nowrap">
                  {spellDuration(spell, l10n)}
                </td>
                <td>{spell.components.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
