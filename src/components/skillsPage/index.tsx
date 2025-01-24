import React from "react";
import Layout from "../layout";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import Loading from "../loading";
import { SkillShapeType } from "../../ldo/dnd5e.shapeTypes";
import useListOfType from "../../hooks/useListOfType";
import Content from "../content";
import { NavLink } from "react-router-dom";

export default function SkillsPage() {
  const { items: skills, isLoading } = useListOfType(
    SkillShapeType,
    "skills",
    "Skill",
  );

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Content>
        <h1>
          <Translation id="skills" /> ({skills.length})
        </h1>
        {isLoading && <Loading />}
      </Content>
      {!isLoading && (
        <table className="table">
          <thead>
            <tr>
              <th>
                <Translation id="name" />
              </th>
              <th>
                <Translation id="abilityScore" />
              </th>
            </tr>
          </thead>
          <tbody>
            {skills
              .sort((a, b) => (a.label > b.label ? 1 : -1))
              .map((skill) => (
                <tr key={skill["@id"]}>
                  <td>
                    <NavLink to={`/skills/${btoa(skill["@id"])}`}>
                      {skill.label}
                    </NavLink>
                  </td>
                  <td>{skill.abilityScore.label}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}
