import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import SearchForm from "../searchForm";
import useSearch from "../../hooks/useSearch";
import { NavLink, useSearchParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { first } from "../../utils/array";
import { type SearchResult, type Suggestion } from "minisearch";
import Markdown from "react-markdown";

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
        <SearchForm />
        {suggestions.length > 0 && (
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
        {results.length === 0 && <Translation id="noResults" />}
        {results.length > 0 && (
          <ul>
            {results.map(({ id, title, text, type, url }) => (
              <li key={`${type}-${id}`}>
                <h2>
                  <NavLink to={url}>
                    {title} (<Translation id={type} />)
                  </NavLink>
                </h2>
                {text && <Markdown>{text.join("\n\n")}</Markdown>}
              </li>
            ))}
          </ul>
        )}
      </Content>
    </Layout>
  );
}
