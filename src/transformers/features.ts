import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import {
  ClassShapeType,
  FeaturePrerequisiteShapeType,
  FeatureShapeType,
  FeatureSpecificShapeType,
  SpellShapeType,
  SubclassShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { Feature, FeatureSpecific } from "../ldo/dnd5e.typings";
import { apiUrlToSubjectUrl, dataPath, dataUrl } from "../utils/dnd5e";
import { writeFileSync } from "node:fs";
import { transformChoice } from "./choice";
import features from "../dnd5eapi-data/5e-SRD-Features.json";

interface SpecificFeature {
  subfeature_options?: components["schemas"]["Choice"];
  expertise_options?: components["schemas"]["Choice"];
  invocations?: Array<components["schemas"]["APIReference"]>;
}

function transformSpecificFeature(
  data: SpecificFeature,
  ldoDataset = createLdoDataset(),
): FeatureSpecific {
  const featureSpecific = ldoDataset
    .usingType(FeatureSpecificShapeType)
    .fromJson({});
  if (data.subfeature_options) {
    featureSpecific.subfeatureOptions = transformChoice(
      data.subfeature_options,
      ldoDataset,
    );
  }
  if (data.expertise_options) {
    featureSpecific.expertiseOptions = transformChoice(
      data.expertise_options,
      ldoDataset,
    );
  }
  if (data.invocations) {
    featureSpecific.invocations = data.invocations.map((invocation) =>
      ldoDataset
        .usingType(FeatureShapeType)
        .fromSubject(apiUrlToSubjectUrl(invocation.url)),
    );
  }
  return featureSpecific;
}

export function transformFeature(
  data: components["schemas"]["Feature"],
  ldoDataset = createLdoDataset(),
): Feature {
  const feature = ldoDataset
    .usingType(FeatureShapeType)
    .fromSubject(`#${data.index}`);
  feature.type = { "@id": "Feature" };
  feature.label = data.name;
  feature.description = data.desc;
  feature.level = data.level;
  feature.class =
    data.class &&
    ldoDataset
      .usingType(ClassShapeType)
      .fromSubject(dataUrl("classes", data.class.index));
  feature.subclass =
    data.subclass &&
    ldoDataset
      .usingType(SubclassShapeType)
      .fromSubject(dataUrl("subclass", data.subclass.index));
  feature.parent =
    data.parent &&
    ldoDataset.usingType(FeatureShapeType).fromSubject(`#${data.parent.index}`);
  feature.featurePrerequisites = data.prerequisites.map((prerequisite) =>
    ldoDataset.usingType(FeaturePrerequisiteShapeType).fromJson({
      ofType: prerequisite.type,
      ...(prerequisite["level"] && { level: prerequisite["level"].toString() }),
      ...(prerequisite["feature"] && {
        feature: ldoDataset
          .usingType(FeatureShapeType)
          .fromSubject(apiUrlToSubjectUrl(prerequisite["feature"])),
      }),
      ...(prerequisite["spell"] && {
        spell: ldoDataset
          .usingType(SpellShapeType)
          .fromSubject(apiUrlToSubjectUrl(prerequisite["spell"])),
      }),
    }),
  );
  feature.featureSpecific =
    data.feature_specific &&
    transformSpecificFeature(data.feature_specific, ldoDataset);
  return feature;
}

export default async function writeFeatures() {
  const turtle = (
    await Promise.all(
      features.map((feature) => toTurtle(transformFeature(feature))),
    )
  ).reduce((memo, features) => memo.concat(features));
  writeFileSync(dataPath("features"), turtle);
}
