import React from "react";
import Content from "../content";
import { Background } from "../../ldo/dnd5e.typings";
import Loading from "../loading";
import Translation from "../translation";
import { proficiencyName, startingEquipmentName } from "../../utils/dnd5e";
import Illustration from "../illustration";
import ChoiceDataListItem from "../choiceDataListItem";

interface Props {
  background: Background;
  isLoading?: boolean;
}

export default function BackgroundInfo({ background, isLoading }: Props) {
  return (
    <Content>
      {!isLoading && background.illustration && (
        <Illustration subject={background.illustration} />
      )}
      <h1>{background.label}</h1>
      {isLoading && <Loading />}
      {!isLoading && (
        <dl className="data-list">
          <dt>
            <Translation id="proficiencies" />
          </dt>
          <dd>
            {background.startingProficiencies.map(proficiencyName).join(", ")}
          </dd>
          <dt>
            <Translation id="equipment" />
          </dt>
          <dd>
            {background.startingEquipment.map(startingEquipmentName).join(", ")}
          </dd>
          {background.startingEquipmentOptions.map((option) => (
            <ChoiceDataListItem
              key={`${option.ofType}-${option.description}`}
              choice={option}
            />
          ))}
          {background.languageOptions && (
            <ChoiceDataListItem choice={background.languageOptions} />
          )}
        </dl>
      )}
    </Content>
  );
}
