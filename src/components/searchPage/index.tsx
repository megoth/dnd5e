import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import useSearch from "../../hooks/useSearch";
import { NavLink, useSearchParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { first } from "../../utils/array";
import { type SearchResult, type Suggestion } from "minisearch";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { description } from "../../utils/dnd5e";
import Loading from "../loading";

export default function SearchPage() {
  const { isLoading, search } = useSearch();
  const [results, setResults] = useState<Array<SearchResult>>([]);
  const [suggestions, setSuggestions] = useState<Array<Suggestion>>([]);
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(first(searchParams.get("search")));

  useEffect(() => {
    if (isLoading) return;
    setResults(search.search(query));
    setSuggestions(search.autoSuggest(query));
  }, [query, isLoading]);

  useEffect(() => setQuery(first(searchParams.get("search"))), [searchParams]);

  return (
    <Layout>
      <Content>
        <h1>
          <Translation id="search" />
        </h1>
        {isLoading && <Loading />}
        {!isLoading && suggestions.length > 0 && (
          <p>
            <Translation id={"suggestions"} />
            :&nbsp;
            {suggestions.map(({ suggestion }, index) => (
              <Fragment key={suggestion}>
                <NavLink to={`?search=${suggestion}`}>{suggestion}</NavLink>
                {index !== suggestions.length - 1 && ", "}
              </Fragment>
            ))}
          </p>
        )}
      </Content>
      {!isLoading && results.length === 0 && <Translation id="noResults" />}
      {!isLoading && results.length > 0 && (
        <ul>
          {results.map(({ id, title, text, type, url }) => (
            <li key={`${type}-${id}`}>
              <Content>
                <h2>
                  <NavLink to={url}>
                    {title} (<Translation id={type} />)
                  </NavLink>
                </h2>
                {text && (
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {description(text)}
                  </Markdown>
                )}
              </Content>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}
