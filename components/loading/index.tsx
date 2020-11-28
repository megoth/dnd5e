import React from "react";

export const TESTID_LOADING = "loading";

export default function Loading() {
  return <div data-testid={TESTID_LOADING}>Loading...</div>;
}
