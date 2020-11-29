import React from "react";
import useBase from "../../src/hooks/useBase";
import Loading from "../loading";
import ErrorMessage from "../errorMessage";
import useErrorMethods from "../../src/hooks/useErrorMethods";
import { getSourceAll, hasWriteAccess } from "../../src/models/base";

export default function Sources() {
  const base = useBase();
  const { error, loading } = base;
  const { getError, isError } = useErrorMethods();

  if (loading) {
    return <Loading />;
  }

  if (error && !isError(error, "baseNotFound"))
    return <ErrorMessage error={error} />;

  const sources = getSourceAll(base);

  return sources.length ? (
    <>
      <h2>Sources:</h2>
      <ul>
        {sources.map((source) => (
          <li key={source.url}>test</li>
        ))}
      </ul>
    </>
  ) : (
    <>
      <ErrorMessage error={getError("sourcesNone")} />
      {hasWriteAccess(base) ? (
        <form onSubmit={(e) => e.preventDefault()}>
          <button type="submit">Create new source</button>
        </form>
      ) : null}
    </>
  );
}
