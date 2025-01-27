import React from "react";
import Layout from "../layout";
import { useLdo } from "@ldo/solid-react";
import useSWR from "swr";
import { BackgroundShapeType } from "../../ldo/dnd5e.shapeTypes";
import Loading from "../loading";
import { backgroundResourceUrls } from "../../utils/dnd5e";
import WarningMessage from "../warningMessage";
import Breadcrumbs from "../breadcrumbs";
import BackgroundInfo from "../backgroundInfo";
import useStoredSubject from "../../hooks/useStoredSubject";

export default function BackgroundPage() {
  const { dataset, getResource } = useLdo();
  const { subject: background } = useStoredSubject(BackgroundShapeType);

  const { isLoading } = useSWR(
    () => `background-${background?.["@id"]}`,
    async () => {
      if (!background) return null;
      await Promise.all(
        backgroundResourceUrls(background, dataset).map((resourceUrl) =>
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
