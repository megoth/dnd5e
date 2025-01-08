import React from "react";
import Layout from "../layout";
import Content from "../content";
import { useParams } from "react-router-dom";
import { useLdo } from "@ldo/solid-react";
import useSWR from "swr";
import { resourceUrl } from "../../utils/url";
import { RaceShapeType } from "../../ldo/dnd5e.shapeTypes";
import Loading from "../loading";
import { raceResources } from "../../utils/dnd5e";
import WarningMessage from "../warningMessage";

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
      <Content>
        <h1>{race.label}</h1>
        <dl className="data-list"></dl>
      </Content>
    </Layout>
  );
}
