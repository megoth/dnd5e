import { v4 as uuidv4 } from "uuid";
import { AlignmentData } from "../download/api.types";
import { Alignment } from "../sanity/schema-types";

export default function migrateAlignmentData(
  existingData: Record<string, any>
) {
  return (inputData) =>
    Object.entries(inputData as Record<string, AlignmentData>).reduce<
      Record<string, Alignment>
    >((outputData, [url, alignment]) => {
      // eslint-disable-next-line no-param-reassign
      outputData[url] = {
        ...(existingData[url] || {}),
        // eslint-disable-next-line no-underscore-dangle
        _id: existingData[url]._id || uuidv4(),
        _type: "alignment",
        name_en_US: alignment.name,
        abbreviation_en_US: alignment.abbreviation,
        description_en_US: alignment.desc,
        slug: {
          _type: "slug",
          current: alignment.index.toString(),
        },
        url,
      };
      return outputData;
    }, {});
}
