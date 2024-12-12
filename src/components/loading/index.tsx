import React from "react";

export const TESTID_LOADING = "loading";

export default function Loading() {
  // Do not try to translate anything here - it's used when loading translations as well
  return <div data-testid={TESTID_LOADING}>Loading...</div>;
}
