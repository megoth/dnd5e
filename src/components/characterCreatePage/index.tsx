import React, { useEffect, useState } from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import Breadcrumbs from "../breadcrumbs";
import useProfile from "../../hooks/useProfile";
import { type SubmitHandler, useForm } from "react-hook-form";
import useListOfType from "../../hooks/useListOfType";
import { RaceShapeType } from "../../ldo/dnd5e.shapeTypes";
import CharacterCreatePageRace from "./race";
import CharacterCreatePageSubrace from "./subrace";
import CharacterCreatePageName from "./name";
import CharacterCreatePageClass from "./class";

export type Inputs = {
  name: string;
  race: string;
  raceProficiencies: string[];
  subrace: string;
  class: string;
  setAsDefault: boolean;
};

export default function CharacterCreatePage() {
  const { profile } = useProfile();
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
    console.log("DATA", data);
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
      </Content>
    </Layout>
  );
}
