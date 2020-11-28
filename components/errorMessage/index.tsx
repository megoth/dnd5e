import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  error: Error;
}

export const TESTID_ERROR = "error";

export default function ErrorMessage({ children, error }: Props) {
  return (
    <div data-testid={TESTID_ERROR}>
      <div>
        <em>{children}</em>
      </div>
      <div>{error.toString()}</div>
    </div>
  );
}
