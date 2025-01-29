import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import DarkModeSelector from "../darkModeSelector";
import LocaleSelector from "../localeSelector";
import React from "react";
import LocalStorageClearButton from "../localStorageClearButton";

export default function SettingsPage() {
  return (
    <Layout>
      <Content>
        <h1>
          <Translation id="settings" />
        </h1>
        <p>
          <Translation id="settingsDarkModeDescription" />
        </p>
        <DarkModeSelector />
        <h2>
          <Translation id="languages" />
        </h2>
        <p>
          <Translation id="settingsLanguagesDescription" />
        </p>
        <LocaleSelector />
        <h2>
          <Translation id="localStorage" />
        </h2>
        <p>
          <Translation id="settingsLocalStorageDescription" />
        </p>
        <LocalStorageClearButton />
      </Content>
    </Layout>
  );
}
