import Translation from "../../translation";
import React, { Fragment } from "react";
import { Class } from "../../../ldo/dnd5e.typings";
import { choiceLabels } from "../../../utils/dnd5e";
import ClassPageChoiceDataListItem from "../choiceDataListItem";

interface Props {
  classInfo: Class;
}

export default function ClassPageProficiencies({ classInfo }: Props) {
  return (
    <article>
      <h3>
        <Translation id="proficiencies" />
      </h3>
      <dl className="data-list">
        <dd>
          {classInfo.proficiencies
            .map((proficiency) => proficiency.label)
            .join(", ")}
        </dd>
        {classInfo.proficiencyChoices.map((choice) => (
          <ClassPageChoiceDataListItem
            key={choice.description}
            choice={choice}
          />
        ))}
        <dt>
          <Translation id="savingThrows" />
        </dt>
        <dd>
          {classInfo.savingThrows
            .map((savingThrow) => savingThrow.label)
            .join(", ")}
        </dd>
      </dl>
    </article>
  );
}
