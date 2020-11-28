import { mockSolidDatasetFrom } from "@inrupt/solid-client";

export default function mockDatasetHook(mock, presets = {}) {
  return mock.mockReturnValue({
    data: mockSolidDatasetFrom("http://example.com"),
    error: null,
    ...presets,
  });
}
