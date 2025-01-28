import React, { useEffect, useState } from "react";
import Translation from "../translation";
import useProfile from "../../hooks/useProfile";
import { type SubmitHandler, useForm } from "react-hook-form";
import useListOfType from "../../hooks/useListOfType";
import { CharacterShapeType, RaceShapeType } from "../../ldo/dnd5e.shapeTypes";
import CharacterFormRace from "./race";
import CharacterFormSubrace from "./subrace";
import CharacterFormName from "./name";
import CharacterCreatePageClass from "./class";
import Loading from "../loading";
import { useLdo } from "@ldo/solid-react";
import { useNavigate } from "react-router";
import useStorage from "../../hooks/useStorage";
import { Character } from "../../ldo/dnd5e.typings";

export type Inputs = {
  name: string;
  race: string;
  raceProficiencies: string[];
  subrace: string;
  class: string;
  setAsDefault: boolean;
};

interface Props {
  character?: Character;
}

export default function CharacterForm({ character }: Props) {
  const navigate = useNavigate();
  const { dataset } = useLdo();
  const { profile } = useProfile();
  const { store } = useStorage();

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      setAsDefault: !profile?.defaultCharacter,
    },
  });

  const { items: races, isLoading } = useListOfType(
    RaceShapeType,
    "characters",
    "Race",
  );
  const [race, setRace] = useState(races?.[0]);
  useEffect(() => setRace(races?.[0]), [races, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const id = character?.["@id"] || `#${crypto.randomUUID()}`;
    const updatedCharacter = dataset.usingType(CharacterShapeType).fromJson({
      "@id": id,
      type: { "@id": "Character" },
      label: data.name,
    });
    const storedCharacter = await store(updatedCharacter, CharacterShapeType);
    navigate(`/characters/${btoa(storedCharacter["@id"])}`);
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <CharacterFormName register={register} name={character?.label} />
      <CharacterFormRace register={register} race={race} setRace={setRace} />
      <CharacterFormSubrace register={register} race={race} />
      <CharacterCreatePageClass register={register} />
      <button type="submit" className="button w-full mt-8">
        <Translation id="createCharacter" />
      </button>
    </form>
  );
}
