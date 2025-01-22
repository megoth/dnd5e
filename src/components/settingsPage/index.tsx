import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import DarkModeSelector from "../darkModeSelector";
import LocaleSelector from "../localeSelector";
import React from "react";

export default function SettingsPage() {
  return (
    <Layout>
      <Content>
        <h1>
          <Translation id="settings" />
        </h1>
        <DarkModeSelector />
        <h2>
          <Translation id="languages" />
        </h2>
        <LocaleSelector />
      </Content>
    </Layout>
  );
}
