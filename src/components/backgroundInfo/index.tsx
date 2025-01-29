import React from "react";
import Content from "../content";
import { Background } from "../../ldo/dnd5e.typings";
import Loading from "../loading";
import Translation from "../translation";
import { proficiencyName, startingEquipmentName } from "../../utils/dnd5e";
import Illustration from "../illustration";
import ChoiceDataListItem from "../choiceDataListItem";
import Markdown from "react-markdown";

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
      {background.backgroundFeature && (
        <>
          <p className="notification">{background.backgroundFeature.label}</p>
          <Markdown>{background.backgroundFeature.description}</Markdown>
        </>
      )}
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
          {background.startingEquipmentChoices.map((choice) => (
            <ChoiceDataListItem
              key={`${choice.ofType}-${choice.description}`}
              choice={choice}
            />
          ))}
          {background.languageChoice && (
            <ChoiceDataListItem choice={background.languageChoice} />
          )}
          {background.personalityTraits && (
            <ChoiceDataListItem
              choice={background.personalityTraits}
              asList={true}
            />
          )}
          {background.ideals && (
            <ChoiceDataListItem choice={background.ideals} asList={true} />
          )}
          {background.bonds && (
            <ChoiceDataListItem choice={background.bonds} asList={true} />
          )}
          {background.flaws && (
            <ChoiceDataListItem choice={background.flaws} asList={true} />
          )}
        </dl>
      )}
    </Content>
  );
}
