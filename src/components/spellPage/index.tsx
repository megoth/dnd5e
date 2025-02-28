import React from "react";
import Layout from "../layout";
import Content from "../content";
import { useParams } from "react-router-dom";
import { useLdo } from "@ldo/solid-react";
import useSWR from "swr";
import { resourceUrl } from "../../utils/url";
import { SpellShapeType } from "../../ldo/dnd5e.shapeTypes";
import Loading from "../loading";
import {
  spellDuration,
  spellMaterial,
  spellResourceUrls,
} from "../../utils/dnd5e";
import Translation from "../translation";
import { useLocalization } from "@fluent/react";
import Markdown from "react-markdown";
import WarningMessage from "../warningMessage";
import Breadcrumbs from "../breadcrumbs";
import remarkGfm from "remark-gfm";
import Illustration from "../illustration";

export default function SpellPage() {
  const params = useParams();
  const url = atob(params.url);
  const { getResource, getSubject } = useLdo();
  const { l10n } = useLocalization();

  const { data: spell } = useSWR(
    () => url,
    async () => {
      await getResource(resourceUrl(url)).readIfUnfetched();
      return getSubject(SpellShapeType, url);
    },
  );

  const { isLoading } = useSWR(
    () => `spell-${spell?.["@id"]}`,
    async () => {
      if (!spell) return null;
      await Promise.all(
        spellResourceUrls(spell).map((resourceUrl) =>
          getResource(resourceUrl).readIfUnfetched(),
        ),
      );
      // must load twice in case of magicSchool illustrations
      await Promise.all(
        spellResourceUrls(spell).map((resourceUrl) =>
          getResource(resourceUrl).readIfUnfetched(),
        ),
      );
    },
  );

  if (!spell) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Breadcrumbs
        crumbs={[
          { href: "/spells", translationId: "spells" },
          { text: spell.label },
        ]}
      />
      {!isLoading && (spell.illustration || spell.magicSchool.illustration) && (
        <Illustration
          subject={spell.illustration || spell.magicSchool.illustration}
        />
      )}
      <Content>
        <h1>{spell.label}</h1>
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            <p className="notification">
              {spell.level > 0 ? (
                <Translation
                  id="spellNote"
                  vars={{
                    order: l10n.getString(`order${spell.level}`),
                    school: spell.magicSchool.label,
                  }}
                />
              ) : (
                <Translation
                  id="cantripNote"
                  vars={{
                    order: l10n.getString(`order${spell.level}`),
                    school: spell.magicSchool.label,
                  }}
                />
              )}
            </p>
            <dl className="data-list">
              <dt>
                <Translation id="castingTime" />
              </dt>
              <dd>{spell.castingTime}</dd>
              <dt>
                <Translation id="range" />
              </dt>
              <dd>{spell.spellRange}</dd>
              <dt>
                <Translation id="components" />
              </dt>
              <dd>
                {spell.components
                  .map((component) =>
                    component === "M" ? spellMaterial(spell) : component,
                  )
                  .join(", ")}
              </dd>
              <dt>
                <Translation id="duration" />
              </dt>
              <dd>{spellDuration(spell, l10n)}</dd>
            </dl>
            <Markdown remarkPlugins={[remarkGfm]}>{spell.description}</Markdown>
            {spell.higherLevel && (
              <dl className="data-list">
                <dt>
                  <Translation id="atHigherLevels" />
                </dt>
                <dd>
                  <Markdown>{spell.higherLevel}</Markdown>
                </dd>
              </dl>
            )}
          </>
        )}
      </Content>
    </Layout>
  );
}
