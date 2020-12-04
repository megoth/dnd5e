import mockResourceBundle from "./mockResourceBundle";
import { ResourceBundleModel } from "../src/models/resourceBundle";

export default function mockResourceBundleHook(
  mock: jest.Mock,
  response: {
    resourceBundle: ResourceBundleModel | null;
  } = {
    resourceBundle: mockResourceBundle(),
  }
) {
  mock.mockReturnValue(response);
}
