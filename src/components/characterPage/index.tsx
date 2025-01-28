import React from "react";
import Layout from "../layout";
import Content from "../content";
import WarningMessage from "../warningMessage";
import Loading from "../loading";
import { CharacterShapeType } from "../../ldo/dnd5e.shapeTypes";
import Illustration from "../illustration";
import Breadcrumbs from "../breadcrumbs";
import Markdown from "react-markdown";
import { transformMarkdownLink } from "../../utils/markdown";
import useStoredSubject from "../../hooks/useStoredSubject";
import { useLocalization } from "@fluent/react";
import { NavLink } from "react-router-dom";
import Translation from "../translation";

export default function CharacterPage() {
  const {
    canEdit,
    subject: character,
    isLoading,
    isLocal,
  } = useStoredSubject(CharacterShapeType);
  const { l10n } = useLocalization();

  if (!character?.["@id"]) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      {isLocal && (
        <WarningMessage>
          <Markdown
            components={{
              a: transformMarkdownLink,
            }}
          >
            {l10n.getString("onlyAvailableLocally")}
          </Markdown>
        </WarningMessage>
      )}
      <Breadcrumbs
        crumbs={[
          { href: "/characters", translationId: "characters" },
          { text: character.label },
        ]}
      />
      {!isLoading && character.illustration && (
        <Illustration subject={character.illustration} />
      )}
      <Content>
        <h1>{character.label}</h1>
        <div className={"options"}>
          {canEdit ? (
            <NavLink
              to={`/characters/${btoa(character["@id"])}/edit`}
              className="button"
            >
              <Translation id="edit" />
            </NavLink>
          ) : (
            <button disabled className="button" type="button">
              <Translation id="edit" />
            </button>
          )}
        </div>
        {isLoading && <Loading />}
      </Content>
    </Layout>
  );
}
