import React, { Fragment } from "react";
import Layout from "../layout";
import Content from "../content";
import WarningMessage from "../warningMessage";
import Loading from "../loading";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { useLdo } from "@ldo/solid-react";
import { resourceUrl } from "../../utils/url";
import { SubclassShapeType } from "../../ldo/dnd5e.shapeTypes";
import { description, subclassResourceUrls } from "../../utils/dnd5e";
import Illustration from "../illustration";
import Markdown from "react-markdown";
import Breadcrumbs from "../breadcrumbs";

export default function SubclassPage() {
  const params = useParams();
  const url = atob(params.url);
  const { getResource, getSubject } = useLdo();

  const { data: subclass } = useSWR(
    () => url,
    async () => {
      await getResource(resourceUrl(url)).readIfUnfetched();
      return getSubject(SubclassShapeType, url);
    },
  );

  const { isLoading } = useSWR(
    () => `subclass-${subclass["@id"]}`,
    async () => {
      await Promise.all(
        subclassResourceUrls(subclass).map((resourceUrl) =>
          getResource(resourceUrl).readIfUnfetched(),
        ),
      );
      // must load twice to get all features through levels
      await Promise.all(
        subclassResourceUrls(subclass).map((resourceUrl) =>
          getResource(resourceUrl).readIfUnfetched(),
        ),
      );
    },
  );

  if (isLoading || !subclass?.["@id"]) {
    return <Loading />;
  }

  const features = subclass.levels.flatMap((level) => level.features);
  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Breadcrumbs
        crumbs={[
          { href: "/classes", translationId: "classes" },
          { href: "/subclasses", translationId: "subclasses" },
          { text: subclass.label },
        ]}
      />
      {subclass.illustration && (
        <Illustration subject={subclass.illustration} />
      )}
      <Content>
        <h1>{subclass.label}</h1>
        {subclass.description && (
          <Markdown>{description(subclass.description)}</Markdown>
        )}
        <dl className={"data-list"}>
          {features.map((feature) => (
            <Fragment key={feature.label}>
              <dt>{feature.label}</dt>
              <dd>
                <Markdown>{description(feature.description)}</Markdown>
              </dd>
            </Fragment>
          ))}
        </dl>
      </Content>
    </Layout>
  );
}
