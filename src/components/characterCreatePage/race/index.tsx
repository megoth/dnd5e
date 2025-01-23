import Translation from "../../translation";
import CharacterCreatePageChoice from "../choice";
import React, { FormEventHandler } from "react";
import useListOfType from "../../../hooks/useListOfType";
import { RaceShapeType } from "../../../ldo/dnd5e.shapeTypes";
import { type UseFormRegister } from "react-hook-form";
import { Inputs } from "../index";
import { Race } from "../../../ldo/dnd5e.typings";

interface Props {
  register: UseFormRegister<Inputs>;
  race?: Race;
  setRace: (newRace: Race) => void;
}

export default function CharacterCreatePageRace({
  register,
  race,
  setRace,
}: Props) {
  const { items: races, isLoading } = useListOfType(
    RaceShapeType,
    "characters",
    "Race",
  );

  const onChange: FormEventHandler<HTMLSelectElement> = (event) =>
    setRace(
      races.find(
        (race) => race["@id"] === (event.target as HTMLSelectElement).value,
      ),
    );

  return (
    <>
      <label htmlFor="race" className="label">
        <Translation id="race" />
      </label>
      <select
        className="select"
        id="race"
        disabled={isLoading}
        {...register("race", { required: true, onChange, disabled: isLoading })}
      >
        {races.map((race) => (
          <option key={race["@id"]} value={race["@id"]}>
            {race.label}
          </option>
        ))}
      </select>
      <CharacterCreatePageChoice choice={race?.startingProficiencyOptions} />
    </>
  );
}
