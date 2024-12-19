import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { AlignmentShapeType, TypeShapeType } from "../ldo/dnd5e.shapeTypes";
import { Alignment } from "../ldo/dnd5e.typings";
import { writeFileSync } from "node:fs";
import { dataPath, dataUrl, vocabUrl } from "../utils/dnd5e";

function transformAlignment(
  data: components["schemas"]["Alignment"],
): Alignment {
  const alignment = createLdoDataset()
    .usingType(AlignmentShapeType)
    .fromSubject(dataUrl("alignments", data.index));
  alignment.type = createLdoDataset()
    .usingType(TypeShapeType)
    .fromSubject(vocabUrl("Alignment"));
  alignment.label = data.name;
  alignment.abbreviation = data.abbreviation;
  alignment.description = data.desc;
  return alignment;
}

export default async function transformAlignments(
  data: Array<components["schemas"]["Alignment"]>,
): Promise<void> {
  const turtle = (
    await Promise.all(
      data.map((alignmentData) => toTurtle(transformAlignment(alignmentData))),
    )
  ).reduce((memo, alignment) => memo.concat(alignment));
  writeFileSync(dataPath("alignments"), turtle);
}
