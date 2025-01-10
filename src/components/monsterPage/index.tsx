import React from "react";
import Layout from "../layout";
import Content from "../content";
import { useParams } from "react-router-dom";
import { useLdo } from "@ldo/solid-react";
import useSWR from "swr";
import { resourceUrl } from "../../utils/url";
import { MonsterShapeType } from "../../ldo/dnd5e.shapeTypes";
import Loading from "../loading";
import {
  monsterChallenge,
  monsterHP,
  monsterResourceUrls,
  monsterType,
} from "../../utils/dnd5e";
import WarningMessage from "../warningMessage";
import Breadcrumbs from "../breadcrumbs";
import Translation from "../translation";
import Illustration from "../illustration";

export default function MonsterPage() {
  const params = useParams();
  const url = atob(params.url);
  const { getResource, getSubject } = useLdo();

  const { data: monster } = useSWR(
    () => url,
    async () => {
      await getResource(resourceUrl(url)).readIfUnfetched();
      return getSubject(MonsterShapeType, url);
    },
  );

  const { isLoading } = useSWR(
    () => `spell-${monster?.["@id"]}`,
    async () => {
      if (!monster) return null;
      return await Promise.all(
        monsterResourceUrls(monster).map((resourceUrl) =>
          getResource(resourceUrl).readIfUnfetched(),
        ),
      );
    },
  );

  if (isLoading || !monster) {
    return <Loading />;
  }

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Breadcrumbs
        crumbs={[
          { href: "/monsters", translationId: "monsters" },
          { text: monster.label },
        ]}
      />
      {monster.illustration && <Illustration subject={monster.illustration} />}
      <Content>
        <h1>{monster.label}</h1>
        <p className="notification">
          {monster.size} {monsterType(monster)}
        </p>
        <dl className="data-list">
          <dt>
            <Translation id="hitPoints" />
          </dt>
          <dd>{monsterHP(monster)}</dd>
          <dt>
            <Translation id="challenge" />
          </dt>
          <dd>{monsterChallenge(monster)}</dd>
        </dl>
      </Content>
    </Layout>
  );
}
