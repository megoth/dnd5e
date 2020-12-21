import mockApp from "./mockApp";
import { AppCoreHookResult } from "../src/hooks/useAppCore";

export default function mockAppCoreHook(
  mock: jest.Mock,
  response: Partial<AppCoreHookResult> = {
    app: mockApp(),
  }
) {
  return mock.mockReturnValue(response);
}
