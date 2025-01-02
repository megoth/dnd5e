import Translation from "../../translation";
import React from "react";
import { Class } from "../../../ldo/dnd5e.typings";
import ClassPageChoiceDataListItem from "../choiceDataListItem";

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
          {classInfo.startingEquipment
            .map((startingEquipment) => startingEquipment.equipment.label)
            .join(", ")}
        </dd>
        {classInfo.startingEquipmentOptions.map((option) => (
          <ClassPageChoiceDataListItem
            key={option.description}
            choice={option}
          />
        ))}
      </dl>
    </article>
  );
}
