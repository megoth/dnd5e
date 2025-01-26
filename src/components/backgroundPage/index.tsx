import React from "react";
import Layout from "../layout";
import { useParams } from "react-router-dom";
import { useLdo } from "@ldo/solid-react";
import useSWR from "swr";
import { resourceUrl } from "../../utils/url";
import { BackgroundShapeType } from "../../ldo/dnd5e.shapeTypes";
import Loading from "../loading";
import { backgroundResourceUrls } from "../../utils/dnd5e";
import WarningMessage from "../warningMessage";
import Breadcrumbs from "../breadcrumbs";
import BackgroundInfo from "../backgroundInfo";

export default function BackgroundPage() {
  const params = useParams();
  const url = atob(params.url);
  const { getResource, getSubject } = useLdo();

  const { data: background } = useSWR(
    () => url,
    async () => {
      await getResource(resourceUrl(url)).readIfUnfetched();
      return getSubject(BackgroundShapeType, url);
    },
  );

  const { isLoading } = useSWR(
    () => `background-${background?.["@id"]}`,
    async () => {
      if (!background) return null;
      await Promise.all(
        backgroundResourceUrls(background).map((resourceUrl) =>
          getResource(resourceUrl).readIfUnfetched(),
        ),
      );
    },
  );

  if (!background) {
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
          { href: "/backgrounds", translationId: "backgrounds" },
          { text: background.label },
        ]}
      />
      <BackgroundInfo background={background} isLoading={isLoading} />
    </Layout>
  );
}
