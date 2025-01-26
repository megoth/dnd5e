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

export default function CharactersPage() {
  const { session } = useSolidAuth();
  const { defaultStorage, isLoading: storageLoading } = useStorage();
  const { items: characters, isLoading: charactersLoading } = useListOfType(
    CharacterShapeType,
    "characters",
    "Character",
  );
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
          <Translation id="charactersPageTitle" />
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
              </div>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}
