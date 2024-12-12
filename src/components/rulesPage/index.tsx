import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";

export default function RulesPage() {
  return (
    <Layout pageName={"rulesPageTitle"}>
      <Content>
        <h1>
          <Translation id="rulesPageTitle" />
        </h1>
        <WarningMessage>
          <Translation id="workInProgress" />
        </WarningMessage>
      </Content>
    </Layout>
  );
}
