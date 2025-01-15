import React from "react";
import Layout from "../layout";
import { useParams } from "react-router-dom";
import { useLdo } from "@ldo/solid-react";
import useSWR from "swr";
import { resourceUrl } from "../../utils/url";
import { EquipmentShapeType } from "../../ldo/dnd5e.shapeTypes";
import Loading from "../loading";
import { equipmentResourceUrls } from "../../utils/dnd5e";
import WarningMessage from "../warningMessage";
import Breadcrumbs from "../breadcrumbs";
import ArmorInfo from "../armorInfo";

export default function ArmorSinglePage() {
  const params = useParams();
  const url = atob(params.url);
  const { getResource, getSubject } = useLdo();

  const { data: equipment } = useSWR(
    () => url,
    async () => {
      await getResource(resourceUrl(url)).readIfUnfetched();
      return getSubject(EquipmentShapeType, url);
    },
  );

  const { isLoading } = useSWR(
    () => `armor-${equipment?.["@id"]}`,
    async () => {
      if (!equipment) return null;
      await Promise.all(
        equipmentResourceUrls(equipment).map((resourceUrl) =>
          getResource(resourceUrl).readIfUnfetched(),
        ),
      );
    },
  );

  if (!equipment) {
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
          { href: "/equipment", translationId: "equipment" },
          { href: "/armor", translationId: "armor" },
          { text: equipment.label },
        ]}
      />
      <ArmorInfo equipment={equipment} />
    </Layout>
  );
}
