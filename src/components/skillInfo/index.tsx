import React from "react";
import Translation from "../translation";
import Markdown from "react-markdown";
import { Skill } from "../../ldo/dnd5e.typings";

interface Props {
  skill: Skill;
}

export default function SkillInfo({ skill }: Props) {
  return (
    <>
      <h2>{skill.label}</h2>
      <dl className="data-list">
        <dt>
          <Translation id="abilityScore" />
        </dt>
        <dd>{skill.abilityScore.label}</dd>
      </dl>
      {skill.description && <Markdown>{skill.description}</Markdown>}
    </>
  );
}
