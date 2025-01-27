import Translation from "../../translation";
import React from "react";
import { Class } from "../../../ldo/dnd5e.typings";
import ChoiceDataListItem from "../../choiceDataListItem";
import { proficiencyName } from "../../../utils/dnd5e";

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
        <dd>{classInfo.proficiencies.map(proficiencyName).join(", ")}</dd>
        {classInfo.proficiencyChoices.map((choice) => (
          <ChoiceDataListItem key={choice.description} choice={choice} />
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
