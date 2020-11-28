import { FluentBundle } from "@fluent/bundle";

export default function mockTranslationsHook(mock: jest.Mock, presets = {}) {
  return mock.mockReturnValue({
    data: [new FluentBundle("en-US")],
    error: null,
    ...presets,
  });
}
