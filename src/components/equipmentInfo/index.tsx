import React from "react";
import Content from "../content";
import { Equipment } from "../../ldo/dnd5e.typings";
import Translation from "../translation";
import { cost, description, weight } from "../../utils/dnd5e";
import Markdown from "react-markdown";

interface Props {
  equipment: Equipment;
}

export default function EquipmentInfo({ equipment }: Props) {
  return (
    <Content>
      <h1>{equipment.label}</h1>
      <p className="notification">{equipment.equipmentCategory.label}</p>
      {equipment.description && (
        <Markdown>{description(equipment.description)}</Markdown>
      )}
      <dl className="data-list">
        <dt>
          <Translation id="cost" />
        </dt>
        <dd>{cost(equipment.cost)}</dd>
        {equipment.gear?.weight && (
          <>
            <dt>
              <Translation id="weight" />
            </dt>
            <dd>{weight(equipment.gear.weight)}</dd>
          </>
        )}
      </dl>
    </Content>
  );
}
