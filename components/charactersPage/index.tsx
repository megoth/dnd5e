import React from "react";
import Layout from "../layout";
import Translation from "../translation";
import Content from "../content";
import WarningMessage from "../warningMessage";
import useApp from "../../src/hooks/useApp";
import { getMessage } from "../../src/models/translation";

export default function CharactersPage() {
  const app = useApp();
  return (
    <Layout pageName={getMessage(app, "charactersPageTitle")}>
      <Content>
        <h1>
          <Translation id="charactersPageTitle" />
        </h1>
        <WarningMessage>
          <Translation id="workInProgress" />
        </WarningMessage>
      </Content>
    </Layout>
  );
}
