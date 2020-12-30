import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";

export default function EquipmentPage() {
  return (
    <Layout>
      <Content>
        <h1>
          <Translation id="equipmentPageTitle" />
        </h1>
        <WarningMessage>
          <Translation id="workInProgress" />
        </WarningMessage>
      </Content>
    </Layout>
  );
}
