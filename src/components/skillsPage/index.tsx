import React from "react";
import Layout from "../layout";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import Loading from "../loading";
import { SkillShapeType } from "../../ldo/dnd5e.shapeTypes";
import useListOfType from "../../hooks/useListOfType";
import Content from "../content";
import SkillInfo from "../skillInfo";

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
        {!isLoading &&
          skills.map((skill) => (
            <article key={skill["@id"]} id={btoa(skill["@id"])}>
              <SkillInfo skill={skill} />
            </article>
          ))}
      </Content>
    </Layout>
  );
}
