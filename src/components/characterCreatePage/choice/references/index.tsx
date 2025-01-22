import React, { FormEventHandler, useState } from "react";
import useRulesBundle from "../../../../hooks/useRulesBundle";
import Translation from "../../../translation";
import { Choice, ReferenceOption } from "../../../../ldo/dnd5e.typings";
import Markdown from "react-markdown";
import { description } from "../../../../utils/dnd5e";

interface Props {
  options?: Choice;
}

function getValue(reference: ReferenceOption): string {
  return (reference.equipment ||
    reference.language ||
    reference.proficiency ||
    reference.spell)["@id"];
}

export default function CharacterCreatePageStartingOptionsReferences({
  options,
}: Props) {
  const [chosen, setChosen] = useState([]);
  const { isLoading } = useRulesBundle("proficiencies");

  const onProficiencyChange: FormEventHandler<HTMLInputElement> = async (
    event,
  ) => {
    if (event.currentTarget.checked) {
      setChosen([...chosen, event.currentTarget.value]);
    } else {
      setChosen(chosen.filter((url) => url !== event.currentTarget.value));
    }
  };

  const complexChoice =
    [
      options.from.abilityScores.length,
      options.from.actions.length,
      options.from.bonuses.length,
      options.from.breaths.length,
      options.from.choices.length,
      options.from.damageOptions.length,
      options.from.equipmentCategory ? 1 : 0,
      options.from.equipmentOptions.length,
      options.from.ideals.length,
      options.from.multiples.length,
      options.from.references.length,
      options.from.strings.length,
    ].filter((length) => length > 0).length > 1;

  return (
    options &&
    !isLoading && (
      <>
        <label htmlFor="subrace" className="label">
          {options.ofType === "equipment" && (
            <Translation id="startingEquipment" />
          )}
          {options.ofType === "language" && (
            <Translation id="startingLanguages" />
          )}
          {options.ofType === "proficiencies" && (
            <Translation id="startingProficiencies" />
          )}
          {options.ofType === "spell" && <Translation id="startingSpells" />} (
          <Translation id="chooseNumber" vars={{ number: options.choose }} />)
        </label>
        {options.description && (
          <Markdown className="notification">
            {description(options.description)}
          </Markdown>
        )}
        <div className="m-2">
          {complexChoice && <>TODO: HERE BE A COMPLEX CHOICE</>}
          {!complexChoice && options.from.abilityScores.length > 0 && (
            <>TODO: HERE BE ABILITY SCORES</>
          )}
          {!complexChoice && options.from.actions.length > 0 && (
            <>TODO: HERE BE ACTIONS</>
          )}
          {!complexChoice && options.from.bonuses.length > 0 && (
            <>TODO: HERE BE BONUSES</>
          )}
          {!complexChoice && options.from.breaths.length > 0 && (
            <>TODO: HERE BE BREATHS</>
          )}
          {!complexChoice && options.from.choices.length > 0 && (
            <>TODO: HERE BE CHOICES</>
          )}
          {!complexChoice && options.from.damageOptions.length > 0 && (
            <>TODO: HERE BE DAMAGE OPTIONS</>
          )}
          {!complexChoice &&
            options.from.equipmentCategory?.equipmentList?.map((equipment) => (
              <label
                key={`${options.from.equipmentCategory["@id"]}-${equipment["@id"]}`}
                className="label mt-2"
              >
                <input
                  className="checkbox"
                  type="checkbox"
                  value={equipment["@id"]}
                  disabled={
                    chosen.length >= options.choose &&
                    !chosen.find((choice) => choice === equipment["@id"])
                  }
                  onChange={onProficiencyChange}
                />{" "}
                {equipment.label}
              </label>
            ))}
          {!complexChoice &&
            options.from.equipmentOptions?.map((option) => (
              <label key={option.equipment["@id"]} className="label mt-2">
                <input
                  className="checkbox"
                  type="checkbox"
                  value={option.equipment["@id"]}
                  disabled={
                    chosen.length >= options.choose &&
                    !chosen.find((choice) => choice === option.equipment["@id"])
                  }
                  onChange={onProficiencyChange}
                />{" "}
                {option.equipment.label}
              </label>
            ))}
          {!complexChoice && options.from.ideals.length > 0 && (
            <>TODO: HERE BE IDEALS</>
          )}
          {!complexChoice && options.from.multiples.length > 0 && (
            <>TODO: HERE BE MULTIPLES</>
          )}
          {!complexChoice &&
            options.from.references?.map((reference) => (
              <label key={getValue(reference)} className="label mt-2">
                <input
                  className="checkbox"
                  type="checkbox"
                  value={getValue(reference)}
                  disabled={
                    chosen.length >= options.choose &&
                    !chosen.find((choice) => choice === getValue(reference))
                  }
                  onChange={onProficiencyChange}
                />{" "}
                {reference.proficiency?.skill?.label ||
                  reference.proficiency?.label}
                {reference.equipment?.label}
                {reference.language?.label}
                {reference.spell?.label}
              </label>
            ))}
          {!complexChoice && options.from.strings.length > 0 && (
            <>TODO: HERE BE STRINGS</>
          )}
        </div>
      </>
    )
  );
}
