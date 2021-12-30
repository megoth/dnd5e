import { mockSolidDatasetFrom, SolidDataset } from "@inrupt/solid-client";
import { SWRResponse } from "swr";

export default function mockDatasetHook(
  mock,
  presets: Partial<SWRResponse<SolidDataset, any>> = {}
) {
  return mock.mockReturnValue({
    data: mockSolidDatasetFrom("http://example.com"),
    error: null,
    ...presets,
  });
}
