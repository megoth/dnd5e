import React from "react";
import Layout from "../layout";
import Translation from "../translation";
import Content from "../content";
import WarningMessage from "../warningMessage";
import { useSolidAuth } from "@ldo/solid-react";
import Unauthenticated from "../unauthenticated";

export default function CharactersPage() {
  const { session } = useSolidAuth();
  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Content>
        <h1>
          <Translation id="charactersPageTitle" />
        </h1>
      </Content>
      {session.isLoggedIn && <p>More stuff to come!</p>}
      {!session.isLoggedIn && <Unauthenticated />}
    </Layout>
  );
}
