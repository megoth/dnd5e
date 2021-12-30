import mockApp from "./mockApp";
import { AppModel } from "../src/models/app";

export default function mockAppHook(
  mock: jest.Mock,
  app = mockApp()
): AppModel {
  mock.mockReturnValue(app);
  return app;
}
