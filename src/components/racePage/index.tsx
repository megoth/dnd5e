import React, { Fragment } from "react";
import Layout from "../layout";
import Content from "../content";
import { useParams } from "react-router-dom";
import { useLdo } from "@ldo/solid-react";
import useSWR from "swr";
import { resourceUrl } from "../../utils/url";
import { RaceShapeType } from "../../ldo/dnd5e.shapeTypes";
import Loading from "../loading";
import { description, raceResources } from "../../utils/dnd5e";
import WarningMessage from "../warningMessage";
import Translation from "../translation";
import Markdown from "react-markdown";
import Breadcrumbs from "../breadcrumbs";
import Illustration from "../illustration";

export default function RacePage() {
  const params = useParams();
  const url = atob(params.url);
  const { getResource, getSubject } = useLdo();

  const { data: race } = useSWR(
    () => url,
    async () => {
      await getResource(resourceUrl(url)).readIfUnfetched();
      return getSubject(RaceShapeType, url);
    },
  );

  const { isLoading } = useSWR(
    () => `race-${race?.["@id"]}`,
    async () => {
      if (!race) return null;
      return Promise.all(
        raceResources(race).map((resourceUrl) =>
          getResource(resourceUrl).readIfUnfetched(),
        ),
      );
    },
  );

  if (isLoading || !race) {
    return <Loading />;
  }

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Breadcrumbs
        crumbs={[
          { href: "/races", translationId: "races" },
          { text: race.label },
        ]}
      />
      {race.illustration && <Illustration subject={race.illustration} />}
      <Content>
        <h1>{race.label}</h1>
        {race.description && (
          <Markdown>{description(race.description)}</Markdown>
        )}
        <dl className="data-list">
          <dt>
            <Translation id="abilityBonuses" />
          </dt>
          <dd>
            {race.abilityBonuses.map((bonus, index) => (
              <span key={bonus.abilityScore["@id"]} className="inline-block">
                +{bonus.bonus} {bonus.abilityScore.label}
                {index !== race.abilityBonuses.length - 1 && ","}
                &nbsp;
              </span>
            ))}
          </dd>
          {race.age && (
            <>
              <dt>
                <Translation id="age" />
              </dt>
              <dd>{race.age}</dd>
            </>
          )}
          {race.alignmentDescription && (
            <>
              <dt>
                <Translation id="alignment" />
              </dt>
              <dd>{race.alignmentDescription}</dd>
            </>
          )}
          <dt>
            <Translation id="size" />
          </dt>
          <dd>{race.sizeDescription || race.size}</dd>
          <dt>
            <Translation id="speed" />
          </dt>
          <dd>{race.speed}ft</dd>
          {race.traits.map((trait) => (
            <Fragment key={trait["@id"]}>
              <dt>{trait.label}</dt>
              <dd>
                <Markdown>{description(trait.description)}</Markdown>
              </dd>
            </Fragment>
          ))}
          <dt>
            <Translation id="languages" />
          </dt>
          <dd>
            {race.languageDescription ||
              race.languages.map((language) => language.label).join(", ")}
          </dd>
        </dl>
      </Content>
    </Layout>
  );
}
