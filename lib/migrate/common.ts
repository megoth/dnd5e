import { v4 as uuidv4 } from "uuid";
import { SanityDocument } from "sanity-codegen";
import { BaseData } from "../download/api.types";

export default function migrateData<
  T extends BaseData,
  U extends SanityDocument
>(existingData: Record<string, any>, migrateFn: (data: T) => Partial<U>) {
  return (inputData) =>
    Object.entries(inputData as Record<string, T>).reduce<Record<string, U>>(
      (outputData, [url, data]) => {
        const existingObject = existingData[url] || {};
        // eslint-disable-next-line no-param-reassign
        outputData[url] = {
          ...existingObject,
          // eslint-disable-next-line no-underscore-dangle
          _id: existingObject._id || uuidv4(),
          // eslint-disable-next-line no-underscore-dangle
          ...migrateFn(data),
          url,
        };
        return outputData;
      },
      {}
    );
}
