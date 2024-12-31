import Translation from "../../translation";
import React from "react";
import { Class } from "../../../ldo/dnd5e.typings";
import { useLdo } from "@ldo/solid-react";
import { EquipmentShapeType } from "../../../ldo/dnd5e.shapeTypes";

interface Props {
  classInfo: Class;
}

export default function ClassPageEquipment({ classInfo }: Props) {
  const { getSubject } = useLdo();
  return (
    <article>
      <h3>
        <Translation id="equipment" />
      </h3>
      <dl className="data-list">
        <dt></dt>
        <dd>
          {classInfo.startingEquipment
            .map(
              (startingEquipment) =>
                getSubject(
                  EquipmentShapeType,
                  startingEquipment.equipment["@id"],
                ).label,
            )
            .join(", ")}
        </dd>
      </dl>
    </article>
  );
}
