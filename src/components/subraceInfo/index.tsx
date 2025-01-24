import React, { Fragment } from "react";
import Content from "../content";
import Illustration from "../illustration";
import Markdown from "react-markdown";
import { Subrace } from "../../ldo/dnd5e.typings";
import Translation from "../translation";

interface Props {
  subrace: Subrace;
}

export default function SubraceInfo({ subrace }: Props) {
  return (
    <article id={btoa(subrace["@id"])}>
      {subrace.illustration && <Illustration subject={subrace.illustration} />}
      <Content>
        <h3>{subrace.label}</h3>
        {subrace.description && <Markdown>{subrace.description}</Markdown>}
        <dl className={"data-list"}>
          <dt>
            <Translation id="abilityBonuses" />
          </dt>
          <dd>
            {subrace.abilityBonuses.map((bonus, index) => (
              <span key={bonus.abilityScore["@id"]} className="inline-block">
                +{bonus.bonus} {bonus.abilityScore.label}
                {index !== subrace.abilityBonuses.length - 1 && ","}
                &nbsp;
              </span>
            ))}
          </dd>
          {subrace.languages.length > 0 && (
            <>
              <dt>
                <Translation id="languages" />
              </dt>
              <dd>
                {subrace.languages.map((language) => language.label).join(", ")}
              </dd>
            </>
          )}
          {subrace.traits.map((trait) => (
            <Fragment key={trait.label}>
              <dt>{trait.label}</dt>
              <dd>
                <Markdown>{trait.description}</Markdown>
              </dd>
            </Fragment>
          ))}
        </dl>
      </Content>
    </article>
  );
}
