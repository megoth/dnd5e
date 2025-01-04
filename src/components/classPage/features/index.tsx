import { Class } from "../../../ldo/dnd5e.typings";
import Markdown from "react-markdown";

interface Props {
  classInfo: Class;
}

export default function ClassPageFeatures({ classInfo }: Props) {
  return (
    <>
      {classInfo.levels
        .flatMap((level) => level.features)
        .map((feature) => (
          <article key={feature["@id"]}>
            <h3>{feature.label}</h3>
            <Markdown>{feature.description.join("\n\n")}</Markdown>
          </article>
        ))}
    </>
  );
}
