import mockApp from "./mockApp";
import { AppModel } from "../src/models/app";

export default function mockAppHook(
  mock: jest.Mock,
  response: {
    app: AppModel | null;
  } = {
    app: mockApp(),
  }
) {
  mock.mockReturnValue(response);
}
