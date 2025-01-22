import React, { FormEventHandler, useState } from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import Breadcrumbs from "../breadcrumbs";
import { useSolidAuth } from "@ldo/solid-react";
import Unauthenticated from "../unauthenticated";
import useProfile from "../../hooks/useProfile";
import Loading from "../loading";
import { type SubmitHandler, useForm } from "react-hook-form";
import useListOfType from "../../hooks/useListOfType";
import { ClassShapeType, RaceShapeType } from "../../ldo/dnd5e.shapeTypes";
import CharacterCreatePageChoice from "./choice";
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
  const { session } = useSolidAuth();
  const { profile, isLoading: profileLoading } = useProfile();
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      setAsDefault: !profile?.defaultCharacter,
    },
  });

  const { items: races } = useListOfType(RaceShapeType, "races", "Race");
  const [race, setRace] = useState(races?.[0]);

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
        {!session.isLoggedIn && (
          <p>
            <Translation id="pageRequiresAuthentication" />
          </p>
        )}
        {session.isLoggedIn && (profileLoading || !profile) && <Loading />}
        {session.isLoggedIn && !profileLoading && profile && (
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <CharacterCreatePageName register={register} />
            <CharacterCreatePageRace register={register} setRace={setRace} />
            <CharacterCreatePageSubrace register={register} race={race} />
            <CharacterCreatePageClass register={register} />
            <button type="submit" className="button w-full mt-8">
              <Translation id="createCharacter" />
            </button>
          </form>
        )}
      </Content>
      {!session.isLoggedIn && <Unauthenticated />}
    </Layout>
  );
}
