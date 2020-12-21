import { mockSolidDatasetFrom, SolidDataset } from "@inrupt/solid-client";
import { responseInterface } from "swr";

export default function mockDatasetHook(
  mock,
  presets: Partial<responseInterface<SolidDataset, any>> = {}
) {
  return mock.mockReturnValue({
    data: mockSolidDatasetFrom("http://example.com"),
    error: null,
    ...presets,
  });
}
