import React from "react";
import Layout from "../layout";
import Translation from "../translation";
import Content from "../content";
import WarningMessage from "../warningMessage";
import { useSolidAuth } from "@ldo/solid-react";
import Breadcrumbs from "../breadcrumbs";
import useStorage from "../../hooks/useStorage";
import { NavLink } from "react-router-dom";

export default function CharactersPage() {
  const { session } = useSolidAuth();
  const { defaultStorage, isLoading } = useStorage();
  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      {!session.isLoggedIn && <WarningMessage id="loginRecommended" />}
      {session.isLoggedIn && !defaultStorage && !isLoading && (
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
    </Layout>
  );
}
