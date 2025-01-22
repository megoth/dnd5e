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
        {complexChoice && <>TODO: This is a complex choice.</>}
        {/*abilityScores*/}
        {/*actions*/}
        {/*bonuses*/}
        {/*breaths*/}
        {/*choices*/}
        {/*damageOptions*/}
        {options.from.equipmentCategory?.equipmentList?.map((equipment) => (
          <label key={equipment["@id"]} className="label">
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
        {/*equipmentOptions*/}
        {/*ideals*/}
        {/*multiples*/}
        {options.from.references?.map((reference) => (
          <label key={getValue(reference)} className="label">
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
        {/*strings*/}
      </>
    )
  );
}
