import React, { useEffect, useState } from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import Breadcrumbs from "../breadcrumbs";
import useProfile from "../../hooks/useProfile";
import { type SubmitHandler, useForm } from "react-hook-form";
import useListOfType from "../../hooks/useListOfType";
import { CharacterShapeType, RaceShapeType } from "../../ldo/dnd5e.shapeTypes";
import CharacterCreatePageRace from "./race";
import CharacterCreatePageSubrace from "./subrace";
import CharacterCreatePageName from "./name";
import CharacterCreatePageClass from "./class";
import Loading from "../loading";
import useStorage from "../../hooks/useStorage";
import { useLdo } from "@ldo/solid-react";
import { vocabUrl } from "../../utils/dnd5e";
import { useNavigate } from "react-router";

export type Inputs = {
  name: string;
  race: string;
  raceProficiencies: string[];
  subrace: string;
  class: string;
  setAsDefault: boolean;
};

export default function CharacterCreatePage() {
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const id = crypto.randomUUID();
    const character = dataset.usingType(CharacterShapeType).fromJson({
      "@id": `#${id}`,
      type: { "@id": "Character" },
      label: data.name,
    });
    const storedCharacter = await store(character, CharacterShapeType);
    navigate(`/characters/${btoa(storedCharacter["@id"])}`);
  };

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Breadcrumbs
        crumbs={[
          { href: "/you", translationId: "yourStuff" },
          { href: "/characters", translationId: "characters" },
          { translationId: "createCharacter" },
        ]}
      />
      <Content>
        <h1>
          <Translation id="createCharacter" />
        </h1>
        {isLoading && <Loading />}
        {!isLoading && (
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <CharacterCreatePageName register={register} />
            <CharacterCreatePageRace
              register={register}
              race={race}
              setRace={setRace}
            />
            <CharacterCreatePageSubrace register={register} race={race} />
            <CharacterCreatePageClass register={register} />
            <button type="submit" className="button w-full mt-8">
              <Translation id="createCharacter" />
            </button>
          </form>
        )}
      </Content>
    </Layout>
  );
}
