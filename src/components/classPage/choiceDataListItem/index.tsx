import { Choice } from "../../../ldo/dnd5e.typings";
import React from "react";
import Translation from "../../translation";
import { choiceLabels } from "../../../utils/dnd5e";
import { useLocalization } from "@fluent/react";

interface Props {
  choice: Choice;
}

export default function ClassPageChoiceDataListItem({ choice }: Props) {
  const { l10n } = useLocalization();
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
      <dd>
        {choiceLabels(choice)
          .map((labels) => labels.join(", "))
          .join(` ${l10n.getString("or")} `)}
      </dd>
    </>
  );
}
