import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import { getMessage } from "../../src/models/translation";
import useApp from "../../src/hooks/useApp";

export default function SpellsPage() {
  const app = useApp();
  return (
    <Layout pageName={getMessage(app, "spellsPageTitle")}>
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
