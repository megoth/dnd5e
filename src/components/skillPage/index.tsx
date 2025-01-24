import React, { useEffect } from "react";
import Layout from "../layout";
import Content from "../content";
import { useLocation, useParams } from "react-router-dom";
import { useLdo } from "@ldo/solid-react";
import useSWR from "swr";
import { resourceUrl } from "../../utils/url";
import { SkillShapeType } from "../../ldo/dnd5e.shapeTypes";
import Loading from "../loading";
import WarningMessage from "../warningMessage";
import Translation from "../translation";
import Markdown from "react-markdown";
import Breadcrumbs from "../breadcrumbs";
import { skillResources } from "../../utils/dnd5e";

export default function SkillPage() {
  const params = useParams();
  const url = atob(params.url);
  const { getResource, getSubject } = useLdo();
  const location = useLocation();

  const { data: skill } = useSWR(
    () => url,
    async () => {
      await getResource(resourceUrl(url)).readIfUnfetched();
      return getSubject(SkillShapeType, url);
    },
  );

  const { isLoading } = useSWR(
    () => `skill-${skill?.["@id"]}`,
    async () => {
      if (!skill) return null;
      return Promise.all(
        skillResources(skill).map((resourceUrl) =>
          getResource(resourceUrl).readIfUnfetched(),
        ),
      );
    },
  );

  useEffect(() => {
    if (isLoading || location.hash === "") return;
    document.getElementById(location.hash.slice(1))?.scrollIntoView();
  }, [isLoading, location]);

  if (!skill) {
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
          { href: "/skills", translationId: "skills" },
          { text: skill.label },
        ]}
      />
      <Content>
        <h1>{skill.label}</h1>
        {isLoading && <Loading />}
        {!isLoading && (
          <dl className="data-list">
            <dt>
              <Translation id="abilityScore" />
            </dt>
            <dd>{skill.abilityScore.label}</dd>
          </dl>
        )}
        {!isLoading && skill.description && (
          <Markdown>{skill.description}</Markdown>
        )}
      </Content>
    </Layout>
  );
}
