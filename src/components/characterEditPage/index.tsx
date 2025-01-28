import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import Breadcrumbs from "../breadcrumbs";
import CharacterForm from "../characterForm";
import useStoredSubject from "../../hooks/useStoredSubject";
import { CharacterShapeType } from "../../ldo/dnd5e.shapeTypes";
import Loading from "../loading";

export default function CharacterEditPage() {
  const { subject: character, isLoading } =
    useStoredSubject(CharacterShapeType);

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      {character && (
        <Breadcrumbs
          crumbs={[
            { href: "/you", translationId: "yourStuff" },
            { href: "/characters", translationId: "characters" },
            {
              href: `/characters/${btoa(character["@id"])}`,
              text: character.label,
            },
            { translationId: "edit" },
          ]}
        />
      )}
      <Content>
        <h1>
          <Translation id="editCharacter" />
        </h1>
        {isLoading && <Loading />}
        {!isLoading && <CharacterForm character={character} />}
      </Content>
    </Layout>
  );
}
