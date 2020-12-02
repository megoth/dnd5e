import mockSWR from "./mockSWR";
import mockResourceBundle from "./mockResourceBundle";

export default function mockResourceBundleHook(
  mock,
  bundle = mockResourceBundle()
) {
  return mockSWR(mock, { data: bundle });
}
