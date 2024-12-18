import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";

export default function ClassesPage() {
  return (
    <Layout pageName={"classesPageTitle"}>
      <Content>
        <h1>
          <Translation id="classesPageTitle" />
        </h1>
        <WarningMessage>
          <Translation id="workInProgress" />
        </WarningMessage>
      </Content>
    </Layout>
  );
}