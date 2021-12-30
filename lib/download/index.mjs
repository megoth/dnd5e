import fetch from "node-fetch";
import { writeFile } from "fs";

function getApiUrl(endpointUrl) {
  return `https://www.dnd5eapi.co${endpointUrl}`;
}

export default async function downloadData() {
  const apiResponse = await fetch(getApiUrl("/api/"));
  const apiEndpointMap = await apiResponse.json();
  await Promise.all(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(apiEndpointMap).map(async ([endpoint, endpointUrl]) => {
      const endpointResponse = await fetch(getApiUrl(endpointUrl));
      const endpointData = await endpointResponse.json();
      const data = [];
      await Promise.all(
        endpointData.results.map(async ({ url }) => {
          const response = await fetch(getApiUrl(url));
          data.push(await response.json());
        })
      );
      const filePath = `data/${endpoint}.json`;
      return writeFile(
        filePath,
        JSON.stringify(data, null, 2),
        { flag: "w+" },
        (error) => {
          if (!error) {
            console.log(
              `Imported data from ${endpoint} (${data.length} items)`
            );
            return;
          }
          console.error(
            `Something went wrong when importing: ${endpoint}`,
            error
          );
        }
      );
    })
  );
}
