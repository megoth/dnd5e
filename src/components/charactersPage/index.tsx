import React from "react";
import Layout from "../layout";
import Translation from "../translation";
import Content from "../content";
import WarningMessage from "../warningMessage";
import { useSolidAuth } from "@ldo/solid-react";
import Unauthenticated from "../unauthenticated";
import Breadcrumbs from "../breadcrumbs";
import useStorage from "../../hooks/useStorage";
import { NavLink } from "react-router-dom";

export default function CharactersPage() {
  const { session } = useSolidAuth();
  const { defaultStorage } = useStorage();
  return (
    <Layout>
      <WarningMessage id="workInProgress" />
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
        {!session.isLoggedIn && (
          <p>
            <Translation id="pageRequiresAuthentication" />
          </p>
        )}
        {!defaultStorage && (
          <>
            <p>
              <Translation id="pageRequiresStorage" />
            </p>
            <NavLink className="button" to={"/storages/create"}>
              <Translation id="createStorage" />
            </NavLink>
          </>
        )}
      </Content>
      {session.isLoggedIn && defaultStorage && (
        <div className="options">
          <NavLink to="/characters/create" className="button">
            <Translation id="createCharacter" />
          </NavLink>
        </div>
      )}
      {!session.isLoggedIn && <Unauthenticated />}
    </Layout>
  );
}
