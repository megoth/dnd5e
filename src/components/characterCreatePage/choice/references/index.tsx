import React, { FormEventHandler, useState } from "react";
import useRulesBundle from "../../../../hooks/useRulesBundle";
import Translation from "../../../translation";
import { Choice, ReferenceOption } from "../../../../ldo/dnd5e.typings";

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
            {reference.proficiency?.label}
            {reference.equipment?.label}
            {reference.language?.label}
            {reference.spell?.label}
          </label>
        ))}
      </>
    )
  );
}
