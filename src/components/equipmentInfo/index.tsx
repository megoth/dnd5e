import React from "react";
import Content from "../content";
import { Equipment } from "../../ldo/dnd5e.typings";
import Translation from "../translation";
import { cost, weight } from "../../utils/dnd5e";
import Markdown from "react-markdown";
import Loading from "../loading";

interface Props {
  equipment: Equipment;
  isLoading?: boolean;
}

export default function EquipmentInfo({ equipment, isLoading }: Props) {
  return (
    <Content>
      <h1>{equipment.label}</h1>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <p className="notification">{equipment.equipmentCategory.label}</p>
          {equipment.description && (
            <Markdown>{equipment.description}</Markdown>
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
        </>
      )}
    </Content>
  );
}
