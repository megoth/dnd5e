import { v4 as uuidv4 } from "uuid";
import { SanityDocument, SanityReference } from "sanity-codegen";
import { BaseData } from "../download/api.types";
import { getDnd5eUrl } from "../manage-data";

export function getReference<T = SanityDocument>(
  preparedDataMap,
  relativeUrl
): SanityReference<T> {
  return {
    _ref: preparedDataMap[getDnd5eUrl(relativeUrl)]._id,
    _type: "reference",
  };
}

interface PreparedDocument
  extends Omit<SanityDocument, "_rev" | "_createdAt" | "_updatedAt"> {
  _rev?: string;
  _createdAt?: string;
  _updatedAt?: string;
  slug: {
    _type: string;
    current: string;
  };
  url: string;
}

export function prepareData<T extends PreparedDocument>(
  existingData: Record<string, T>,
  importedData: Record<string, BaseData>
) {
  return Object.entries(importedData).reduce<Record<string, PreparedDocument>>(
    (outputData, [url, data]) => {
      // eslint-disable-next-line no-param-reassign
      outputData[url] = {
        ...(existingData[url] || { _id: uuidv4() }),
        slug: {
          _type: "slug",
          current: data.index.toString(),
        },
        url,
      };
      return outputData;
    },
    {}
  );
}

export function migrateData<T extends BaseData, U extends SanityDocument>(
  preparedData: Record<string, PreparedDocument>,
  migrateFn: (data: T) => Omit<U, "_id" | "_rev" | "_createdAt" | "_updatedAt">
) {
  return (inputData: Record<string, T>) =>
    Object.entries(inputData).map(([url, data]) => ({
      ...preparedData[url],
      ...migrateFn(data),
    }));
}
