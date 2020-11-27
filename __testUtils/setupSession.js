/* eslint no-undef: 0 */

const solidUIReactFns = require("@inrupt/solid-ui-react");
const { mockAuthenticatedSession } = require("./mockSession");
const { default: mockComponent } = require("./mockComponent");

beforeEach(() => {
  jest
    .spyOn(solidUIReactFns, "useSession")
    .mockImplementation(() => mockAuthenticatedSession());
  mockComponent(solidUIReactFns, "CombinedDataProvider");
});
