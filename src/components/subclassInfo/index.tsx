import React, { Fragment } from "react";
import Content from "../content";
import Illustration from "../illustration";
import Markdown from "react-markdown";
import { Subclass } from "../../ldo/dnd5e.typings";
import Translation from "../translation";
import { parseNumber } from "../../utils/dnd5e";

interface Props {
  subclass: Subclass;
  isLoading?: boolean;
}

export default function SubclassInfo({ subclass }: Props) {
  const features = subclass.levels.flatMap((level) => level.features);
  const hasAuraRange =
    subclass.levels.filter((level) => !!level.subclassSpecific?.auraRange)
      .length > 0;
  const hasAdditionalMagicalSecrets =
    subclass.levels.filter(
      (level) => !!level.subclassSpecific?.additionalMagicalSecretsMaxLvl,
    ).length > 0;
  return (
    <article id={btoa(subclass["@id"])}>
      {subclass.illustration && (
        <Illustration subject={subclass.illustration} />
      )}
      <Content>
        <h3>{subclass.label}</h3>
        {subclass.description && <Markdown>{subclass.description}</Markdown>}
        <table>
          <thead>
            <tr>
              <th>
                <Translation id="level" />
              </th>
              <th>
                <Translation id="features" />
              </th>
              {hasAuraRange && (
                <th>
                  <Translation id="auraRange" />
                </th>
              )}
              {hasAdditionalMagicalSecrets && (
                <th>
                  <Translation id="additionalMagicalSecrets" />
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {subclass.levels.map((level) => (
              <tr key={level["@id"]}>
                <td>{level.level}</td>
                <td>
                  {level.features.map((feature) => feature.label).join(", ")}
                </td>
                {hasAuraRange && (
                  <td>{parseNumber(level.subclassSpecific?.auraRange)}</td>
                )}
                {hasAdditionalMagicalSecrets && (
                  <td>
                    {parseNumber(
                      level.subclassSpecific?.additionalMagicalSecretsMaxLvl,
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <dl className={"data-list"}>
          {features.map((feature) => (
            <Fragment key={feature.label}>
              <dt>{feature.label}</dt>
              <dd>
                <Markdown>{feature.description}</Markdown>
              </dd>
            </Fragment>
          ))}
        </dl>
      </Content>
    </article>
  );
}
