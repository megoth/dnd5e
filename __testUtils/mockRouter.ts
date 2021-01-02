import { NextRouter } from "next/router";

export default function mockRouter(
  overrides: Partial<NextRouter> = {}
): NextRouter {
  return {
    asPath: "/",
    query: {},
    ...overrides,
  } as NextRouter;
}
