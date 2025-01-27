import Translation from "../../translation";
import React from "react";
import { Class } from "../../../ldo/dnd5e.typings";
import ChoiceDataListItem from "../../choiceDataListItem";
import { startingEquipmentName } from "../../../utils/dnd5e";

interface Props {
  classInfo: Class;
}

export default function ClassPageEquipment({ classInfo }: Props) {
  return (
    <article>
      <h3>
        <Translation id="equipment" />
      </h3>
      <dl className="data-list">
        <dd>
          {classInfo.startingEquipment.map(startingEquipmentName).join(", ")}
        </dd>
        {classInfo.startingEquipmentOptions.map((option) => (
          <ChoiceDataListItem key={option.description} choice={option} />
        ))}
      </dl>
    </article>
  );
}
