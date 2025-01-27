import { Choice } from "../../ldo/dnd5e.typings";
import React from "react";
import Translation from "../translation";
import { choiceLabels } from "../../utils/dnd5e";
import { useLocalization } from "@fluent/react";
import { useLdo } from "@ldo/solid-react";

interface Props {
  choice: Choice;
  asList?: boolean;
}

export default function ChoiceDataListItem({ choice, asList }: Props) {
  const { dataset } = useLdo();
  const { l10n } = useLocalization();
  const labels = choiceLabels(choice, dataset);
  return (
    <>
      <dt>
        <Translation
          id="chooseNumberFromType"
          vars={{
            number: choice.choose,
            type: l10n.getString(choice.ofType).toLowerCase(),
          }}
        />
      </dt>
      <dd>
        {asList ? (
          <>
            <br />
            <ol>{labels[0]?.map((label) => <li key={label}>{label}</li>)}</ol>
          </>
        ) : (
          labels
            .map((innerLabels) => innerLabels.join(", "))
            .join(` ${l10n.getString("or")} `)
        )}
      </dd>
    </>
  );
}
