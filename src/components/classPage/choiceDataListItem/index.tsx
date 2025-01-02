import { Choice } from "../../../ldo/dnd5e.typings";
import React from "react";
import Translation from "../../translation";
import { choiceLabels } from "../../../utils/dnd5e";

interface Props {
  choice: Choice;
}

export default function ClassPageChoiceDataListItem({ choice }: Props) {
  return (
    <>
      <dt>
        <Translation
          id="chooseNumberFrom"
          vars={{
            number: choice.choose,
          }}
        />
      </dt>
      <dd>{choiceLabels(choice)}</dd>
    </>
  );
}
