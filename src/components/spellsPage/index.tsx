import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";

export default function SpellsPage() {
  return (
    <Layout pageName={"spellsPageTitle"}>
      <Content>
        <h1>
          <Translation id="spellsPageTitle" />
        </h1>
        <WarningMessage>
          <Translation id="workInProgress" />
        </WarningMessage>
      </Content>
    </Layout>
  );
}
