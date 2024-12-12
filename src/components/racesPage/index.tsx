import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";

export default function RacesPage() {
  return (
    <Layout pageName={"racesPageTitle"}>
      <Content>
        <h1>
          <Translation id="racesPageTitle" />
        </h1>
        <WarningMessage>
          <Translation id="workInProgress" />
        </WarningMessage>
      </Content>
    </Layout>
  );
}
