import React, { Fragment } from "react";
import Content from "../content";
import { description } from "../../utils/dnd5e";
import Illustration from "../illustration";
import Markdown from "react-markdown";
import { Subclass } from "../../ldo/dnd5e.typings";

interface Props {
  subclass: Subclass;
  isLoading?: boolean;
}

export default function SubclassInfo({ subclass }: Props) {
  const features = subclass.levels.flatMap((level) => level.features);
  return (
    <article id={btoa(subclass["@id"])}>
      {subclass.illustration && (
        <Illustration subject={subclass.illustration} />
      )}
      <Content>
        <h3>{subclass.label}</h3>
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
    </article>
  );
}
