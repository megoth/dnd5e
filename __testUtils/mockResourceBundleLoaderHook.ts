import { responseInterface } from "swr";
import mockResourceBundle from "./mockResourceBundle";
import { ResourceBundleModel } from "../src/models/resourceBundle";

export default function mockResourceBundleLoaderHook(
  mock: jest.Mock,
  swrResponse: Partial<responseInterface<ResourceBundleModel, any>> = {
    data: mockResourceBundle(),
  }
) {
  return mock.mockReturnValue(swrResponse);
}
