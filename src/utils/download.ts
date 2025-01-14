import fetch from "node-fetch";
import { writeFile } from "fs";

// TODO: PROBABLY DELETE
// Keeping it for now

function getApiUrl(endpointUrl) {
  return `https://www.dnd5eapi.co${endpointUrl}`;
}

async function packageEndpointData(
  endpoint: string,
  urlsToFetch: string[],
): Promise<unknown> {
  const data = {};
  await Promise.all(
    urlsToFetch.map(async (url) => {
      const conceptUrl = getApiUrl(url);
      const response = await fetch(conceptUrl);
      data[conceptUrl] = await response.json();
    }),
  );
  writeFile(
    `data/${endpoint}.json`,
    JSON.stringify(data, null, 2),
    { flag: "w+" },
    (error) => {
      if (!error) {
        console.log(
          `Imported data from ${endpoint} (${Object.keys(data).length} items)`,
        );
        return;
      }
      console.error(`Something went wrong when packaging: ${endpoint}`, error);
    },
  );
  return data;
}

export default async function downloadData() {
  const apiResponse = await fetch(getApiUrl("/api/"));
  const apiEndpointMap = (await apiResponse.json()) as Record<string, string>;
  const data = (
    await Promise.all(
      Object.entries(apiEndpointMap).map(async ([endpoint, endpointUrl]) => {
        const endpointResponse = await fetch(getApiUrl(endpointUrl));
        const endpointData = await endpointResponse.json();
        const urlsToFetch = endpointData.results.map(({ url }) => url);
        return {
          endpoint,
          endpointUrl,
          data: await packageEndpointData(endpoint, urlsToFetch),
        };
      }),
    )
  ).reduce<Array<Record<string, any>>>(
    (memo, { data: endpointData }) => memo.concat(Object.values(endpointData)),
    [],
  );
  await Promise.all([
    packageEndpointData(
      "class-levels",
      data.flatMap((thing) => (thing.class_levels ? [thing.class_levels] : [])),
    ),
    packageEndpointData(
      "subclass-levels",
      data.flatMap((thing) =>
        thing.subclass_levels ? [thing.subclass_levels] : [],
      ),
    ),
  ]);
}
