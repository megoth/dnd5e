import { responseInterface } from "swr";
import mockApp from "./mockApp";
import { AppModel } from "../src/models/app";

export default function mockAppLoader(
  mock: jest.Mock,
  swrResponse: Partial<responseInterface<AppModel, any>> = {
    data: mockApp(),
  }
) {
  return mock.mockReturnValue(swrResponse);
}
