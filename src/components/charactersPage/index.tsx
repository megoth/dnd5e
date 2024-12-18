import React from "react";
import Layout from "../layout";
import Translation from "../translation";
import Content from "../content";
import WarningMessage from "../warningMessage";

export default function CharactersPage() {
  return (
    <Layout pageName={"charactersPageTitle"}>
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
