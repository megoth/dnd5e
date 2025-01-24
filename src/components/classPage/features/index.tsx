import { Class } from "../../../ldo/dnd5e.typings";
import Markdown from "react-markdown";
import { removeDuplicates } from "../../../utils/array";

interface Props {
  classInfo: Class;
}

export default function ClassPageFeatures({ classInfo }: Props) {
  const features = classInfo.levels.flatMap((level) => level.features);
  const featureLabels = removeDuplicates(
    features.map((feature) => feature.label),
  );
  return (
    <>
      {features
        .filter(
          (feature, index) => featureLabels.indexOf(feature.label) === index,
        )
        .map((feature) => (
          <article key={feature["@id"]}>
            <h3>{feature.label}</h3>
            <Markdown>{feature.description}</Markdown>
          </article>
        ))}
    </>
  );
}
