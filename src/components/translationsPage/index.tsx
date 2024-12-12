import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";

export default function TranslationsPage() {
  return (
    <Layout pageName="translationsPageTitle" bundle="admin">
      <Content>
        <h1>
          <Translation id="translationsPageTitle" bundle="admin" />
        </h1>
        <WarningMessage>
          <Translation id="workInProgress" />
        </WarningMessage>
      </Content>
    </Layout>
  );
}
