import { v4 as uuidv4 } from "uuid";
import { SanityDocument, SanityReference } from "sanity-codegen";
import { BaseData } from "../download/api.types";
import { getDnd5eUrl } from "../manage-data";

export function getReference<T = SanityDocument>(
  existingDataMap,
  relativeUrl
): SanityReference<T> {
  return {
    // eslint-disable-next-line no-underscore-dangle
    _ref: existingDataMap[getDnd5eUrl(relativeUrl)]._id,
    _type: "reference",
  };
}

export function migrateData<T extends BaseData, U extends SanityDocument>(
  existingData: Record<string, any>,
  migrateFn: (data: T) => Omit<U, "_id" | "_rev" | "_createdAt" | "_updatedAt">
) {
  return (inputData) =>
    Object.entries(inputData as Record<string, T>).reduce<Record<string, U>>(
      (outputData, [url, data]) => {
        const existingObject = existingData[url] || {};
        // eslint-disable-next-line no-param-reassign
        outputData[url] = {
          ...existingObject,
          // eslint-disable-next-line no-underscore-dangle
          _id: existingObject._id || uuidv4(),
          slug: {
            _type: "slug",
            current: data.index.toString(),
          },
          // eslint-disable-next-line no-underscore-dangle
          ...migrateFn(data),
          url,
        };
        return outputData;
      },
      {}
    );
}
