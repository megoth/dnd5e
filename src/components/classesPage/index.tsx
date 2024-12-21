import React, { useMemo } from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import useRulesBundle from "../../hooks/useRulesBundle";
import Loading from "../loading";
import { useLdo } from "@ldo/solid-react";
import { vocabUrl } from "../../utils/dnd5e";
import { namedNode } from "@rdfjs/data-model";
import { ClassShapeType } from "../../ldo/dnd5e.shapeTypes";

export default function ClassesPage() {
  const { dataset, getSubject } = useLdo();
  const { isLoading } = useRulesBundle("classes");

  const classes = useMemo(() => {
    if (!dataset || isLoading) return null;
    return dataset
      .match(null, null, namedNode(vocabUrl("Class")))
      .toArray()
      .map((quad) => getSubject(ClassShapeType, quad.subject.value));
  }, [dataset, isLoading]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Layout pageName={"classesPageTitle"}>
      <Content>
        <h1>
          <Translation id="classesPageTitle" />
        </h1>
        <WarningMessage>
          <Translation id="workInProgress" />
        </WarningMessage>
        <ul>
          {classes.map((adventureClass) => (
            <li key={adventureClass["@id"]}>{adventureClass.label}</li>
          ))}
        </ul>
      </Content>
    </Layout>
  );
}
