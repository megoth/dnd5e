import alignments from "../dnd5eapi-data/5e-SRD-Alignments.json";
import transformAlignments from "./alignments";

export default async function transformData() {
  return Promise.all([transformAlignments(alignments)]);
}
