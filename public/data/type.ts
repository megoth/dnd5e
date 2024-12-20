import { TypeShapeType } from "../../src/ldo/dnd5e.shapeTypes";
import { vocabUrl } from "../../src/utils/dnd5e";
import { createLdoDataset } from "@ldo/ldo";

export function type(className: string) {
  return createLdoDataset()
    .usingType(TypeShapeType)
    .fromSubject(vocabUrl(className));
}
