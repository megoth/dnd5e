import Translation from "../../translation";
import React, { Fragment } from "react";
import { Class } from "../../../ldo/dnd5e.typings";

interface Props {
  classInfo: Class;
}

export default function ClassPageProficiencies({ classInfo }: Props) {
  return (
    <article>
      <h3>
        <Translation id="proficiencies" />
      </h3>
      <dl className="data-list">
        <dt></dt>
        <dd>
          {classInfo.proficiencies
            .map((proficiency) => proficiency.label)
            .join(", ")}
        </dd>
        {classInfo.proficiencyChoices.map((choice) => (
          <Fragment key={choice.description}>
            <dt>
              <Translation
                id="chooseNumberFrom"
                vars={{
                  number: choice.choose,
                }}
              />
              :
            </dt>
            <dd>
              {choice.from.choices
                .flatMap((option) =>
                  option.choice.from.references.map(
                    (reference) =>
                      reference.proficiency?.label ||
                      reference.language?.label ||
                      reference.spell?.label ||
                      reference.equipment?.label,
                  ),
                )
                .join(", ")}
              {choice.from.references
                .map(
                  (reference) =>
                    reference.proficiency?.label ||
                    reference.language?.label ||
                    reference.spell?.label ||
                    reference.equipment?.label,
                )
                .join(", ")}
              &nbsp;
            </dd>
          </Fragment>
        ))}
        <dt>
          <Translation id="savingThrows" />:
        </dt>
        <dd>
          {classInfo.savingThrows
            .map((savingThrow) => savingThrow.label)
            .join(", ")}
        </dd>
      </dl>
    </article>
  );
}
