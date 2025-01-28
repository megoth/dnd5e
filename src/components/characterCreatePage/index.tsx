import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import Breadcrumbs from "../breadcrumbs";
import CharacterForm from "../characterForm";

export default function CharacterCreatePage() {
  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Breadcrumbs
        crumbs={[
          { href: "/you", translationId: "yourStuff" },
          { href: "/characters", translationId: "characters" },
          { translationId: "createCharacter" },
        ]}
      />
      <Content>
        <h1>
          <Translation id="createCharacter" />
        </h1>
        <CharacterForm />
      </Content>
    </Layout>
  );
}
