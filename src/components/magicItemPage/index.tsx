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
import MagicItemInfo from "../magicItemInfo";

export default function MagicItemPage() {
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
    () => `magic-item-${equipment?.["@id"]}`,
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
          { href: "/magic-items", translationId: "magicItems" },
          { text: equipment.label },
        ]}
      />
      <MagicItemInfo equipment={equipment} isLoading={isLoading} />
    </Layout>
  );
}
