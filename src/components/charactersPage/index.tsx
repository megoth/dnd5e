import React from "react";
import Layout from "../layout";
import Translation from "../translation";
import Content from "../content";
import WarningMessage from "../warningMessage";
import { useSolidAuth } from "@ldo/solid-react";
import Breadcrumbs from "../breadcrumbs";
import useStorage from "../../hooks/useStorage";
import { NavLink } from "react-router-dom";
import useListOfType from "../../hooks/useListOfType";
import { CharacterShapeType } from "../../ldo/dnd5e.shapeTypes";
import Loading from "../loading";
import { isLocal } from "../../utils/dnd5e";
import Markdown from "react-markdown";
import { transformMarkdownLink } from "../../utils/markdown";
import { useLocalization } from "@fluent/react";

export default function CharactersPage() {
  const { session } = useSolidAuth();
  const { defaultStorage, isLoading: storageLoading } = useStorage();
  const { items: characters, isLoading: charactersLoading } = useListOfType(
    CharacterShapeType,
    "characters",
    "Character",
  );
  const { l10n } = useLocalization();
  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      {!session.isLoggedIn && <WarningMessage id="loginRecommended" />}
      {session.isLoggedIn && !defaultStorage && !storageLoading && (
        <WarningMessage id="storageRecommended" />
      )}
      <Breadcrumbs
        crumbs={[
          { href: "/you", translationId: "yourStuff" },
          { translationId: "charactersPageTitle" },
        ]}
      />
      <Content>
        <h1>
          <Translation id="charactersPageTitle" /> ({characters.length})
        </h1>
      </Content>
      <div className="options">
        <NavLink to="/characters/create" className="button">
          <Translation id="createCharacter" />
        </NavLink>
      </div>
      {(charactersLoading || storageLoading) && <Loading />}
      {!charactersLoading && !storageLoading && characters?.length > 0 && (
        <ul className="cards">
          {characters?.map((character) => (
            <li key={character["@id"]} className="card">
              <div className="card__content">
                <h2 className="card__title">
                  <NavLink to={`/characters/${btoa(character["@id"])}`}>
                    {character.label}
                  </NavLink>
                </h2>
                {isLocal(character) && (
                  <Markdown
                    components={{
                      a: transformMarkdownLink,
                    }}
                    className="content notification"
                  >
                    {l10n.getString("onlyAvailableLocally")}
                  </Markdown>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}
