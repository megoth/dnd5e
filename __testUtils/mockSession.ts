import { Session } from "@inrupt/solid-client-authn-browser";

export interface SessionInfo {
  session: Session;
  sessionRequestInProgress: boolean;
  fetch: typeof window.fetch;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const authenticatedWebId = "http://example.com/webId#me";

export function mockAuthenticatedSession(options: Partial<SessionInfo> = {}) {
  return ({
    session: {
      info: {
        isLoggedIn: true,
        sessionId: "some-authenticated-session-id",
        webId: authenticatedWebId,
      },
      sessionRequestInProgress: false,
    },
    handleIncomingRedirect: () => Promise.resolve(),
    login: jest.fn().mockResolvedValue(undefined),
    logout: jest.fn().mockResolvedValue(undefined),
    on: () => {},
    ...options,
  } as unknown) as SessionInfo;
}

export function mockUnauthenticatedSession(options: Partial<SessionInfo> = {}) {
  return ({
    session: {
      info: {
        isLoggedIn: false,
        sessionId: "some-unauthenticated-session-id",
        webId: null,
      },
      sessionRequestInProgress: false,
    },
    handleIncomingRedirect: () => Promise.resolve(),
    login: jest.fn().mockResolvedValue(undefined),
    logout: jest.fn().mockResolvedValue(undefined),
    on: () => {},
    ...options,
  } as unknown) as SessionInfo;
}
