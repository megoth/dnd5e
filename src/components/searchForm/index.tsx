import Translation from "../translation";
import { bem } from "../../utils/bem";
import { useNavigate } from "react-router";
import { FormEvent, useEffect, useState } from "react";
import useSearch from "../../hooks/useSearch";
import { useLocalization } from "@fluent/react";
import { useSearchParams } from "react-router-dom";
import { first } from "../../utils/array";

interface Props {
  modifier?: string;
  path?: string;
}

export default function SearchForm({ modifier, path }: Props) {
  const { isLoading } = useSearch();
  const { l10n } = useLocalization();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(first(searchParams.get("search")));
  useEffect(() => setQuery(first(searchParams.get("search"))), [searchParams]);

  const navigate = useNavigate();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    navigate(
      `${path}?search=${encodeURIComponent(formData.get("search").toString())}`,
    );
  };

  return (
    <form className={bem("form", "search", modifier)} onSubmit={onSubmit}>
      <label className={bem("label", "search", modifier)} htmlFor="search">
        <Translation id="search" />
      </label>
      <input
        className={bem("input", modifier)}
        name="search"
        type="text"
        id="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={isLoading}
        aria-disabled={isLoading}
        placeholder={l10n.getString(isLoading ? "loading" : "searchHere")}
      />
      <button type="submit" className={bem("button", "search", modifier)}>
        <Translation id="search" />
      </button>
    </form>
  );
}
