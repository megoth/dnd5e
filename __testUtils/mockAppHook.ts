import mockApp from "./mockApp";

export default function mockAppHook(mock: jest.Mock, app = mockApp()) {
  mock.mockReturnValue(app);
}
