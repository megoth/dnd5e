import Translation from "../../translation";
import CharacterCreatePageChoice from "../choice";
import React, { FormEventHandler, useEffect, useState } from "react";
import { Race } from "../../../ldo/dnd5e.typings";
import { type UseFormRegister } from "react-hook-form";
import { Inputs } from "../index";

interface Props {
  race: Race;
  register: UseFormRegister<Inputs>;
}

export default function CharacterCreatePageSubrace({ race, register }: Props) {
  const [subrace, setLocalSubrace] = useState(race?.subraces?.[0]);

  useEffect(() => setLocalSubrace(race?.subraces?.[0]), [race]);

  const onSubraceChange: FormEventHandler<HTMLSelectElement> = async (
    event,
  ) => {
    const subrace = race.subraces.find(
      (subrace) => subrace["@id"] === (event.target as HTMLSelectElement).value,
    );
    setLocalSubrace(subrace);
  };

  return (
    race && (
      <>
        <label htmlFor="subrace" className="label">
          <Translation id="subrace" />
        </label>
        <select
          className="select"
          id="subrace"
          disabled={race.subraces.length === 0}
          {...register("subrace", {
            required: true,
            onChange: onSubraceChange,
          })}
        >
          {race.subraces.map((subrace) => (
            <option key={subrace["@id"]} value={subrace["@id"]}>
              {subrace.label}
            </option>
          ))}
          {race.subraces.length === 0 && <option>No subraces available</option>}
        </select>
        <CharacterCreatePageChoice choice={subrace?.languageOptions} />
      </>
    )
  );
}
