import React, { ReactEventHandler } from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import Breadcrumbs from "../breadcrumbs";
import useStoredSubject from "../../hooks/useStoredSubject";
import { CharacterShapeType } from "../../ldo/dnd5e.shapeTypes";
import Loading from "../loading";
import { useNavigate } from "react-router";
import useSearch from "../../hooks/useSearch";

export default function CharacterDeletePage() {
  const {
    subject: character,
    isLoading,
    remove,
  } = useStoredSubject(CharacterShapeType);
  const navigate = useNavigate();
  const { search } = useSearch();

  const onSubmit: ReactEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await remove();
    search.discard(character["@id"]);
    navigate("/characters");
  };

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
            { translationId: "deleteCharacter" },
          ]}
        />
      )}
      <Content>
        <h1>
          <Translation id="deleteCharacter" />
        </h1>
      </Content>
      {isLoading && <Loading />}
      {!isLoading && character && (
        <form onSubmit={onSubmit}>
          <Content>
            <Translation
              id="deleteCharacterConfirmation"
              vars={{ characterName: character.label }}
            />
          </Content>
          <button type="submit" className="button">
            <Translation id="confirm" />
          </button>
        </form>
      )}
    </Layout>
  );
}
