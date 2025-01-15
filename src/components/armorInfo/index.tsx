import React from "react";
import Content from "../content";
import { Equipment } from "../../ldo/dnd5e.typings";
import Translation from "../translation";
import { armorClass, cost, description, weight } from "../../utils/dnd5e";
import Markdown from "react-markdown";
import { useLocalization } from "@fluent/react";
import Loading from "../loading";

interface Props {
  equipment: Equipment;
  isLoading?: boolean;
}

export default function ArmorInfo({ equipment, isLoading }: Props) {
  const { l10n } = useLocalization();
  return (
    <Content>
      <h1>{equipment.label}</h1>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <p className="notification">
            {equipment.armor.armorCategory} {equipment.equipmentCategory.label}
          </p>
          {equipment.description && (
            <Markdown>{description(equipment.description)}</Markdown>
          )}
          <dl className="data-list">
            <dt>
              <Translation id="armorClass" />
            </dt>
            <dd>{armorClass(equipment.armor.armorClass, l10n)}</dd>
            <dt>
              <Translation id="cost" />
            </dt>
            <dd>{cost(equipment.cost)}</dd>
            <dt>
              <Translation id="weight" />
            </dt>
            <dd>{weight(equipment.armor.weight)}</dd>
          </dl>
        </>
      )}
    </Content>
  );
}
