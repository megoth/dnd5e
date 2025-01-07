import Translation from "../translation";
import { bem } from "../../utils/bem";
import { useNavigate } from "react-router";
import { FormEvent } from "react";
import useSearch from "../../hooks/useSearch";
import { useLocalization } from "@fluent/react";
import { useSearchParams } from "react-router-dom";
import { first } from "../../utils/array";

export default function SearchForm() {
  const { isLoading } = useSearch();
  const { l10n } = useLocalization();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    navigate(
      `?search=${encodeURIComponent(formData.get("search").toString())}`,
    );
  };

  return (
    <form className={bem("form", "search")} onSubmit={onSubmit}>
      <label className={bem("label", "search")} htmlFor="search">
        <Translation id="search" />
      </label>
      <input
        className={bem("input")}
        name="search"
        type="text"
        id="search"
        defaultValue={first(searchParams.get("search"))}
        disabled={isLoading}
        aria-disabled={isLoading}
        placeholder={isLoading ? l10n.getString("loading") : ""}
        autoFocus={true}
      />
      <button type="submit" className={bem("button", "search")}>
        <Translation id="search" />
      </button>
    </form>
  );
}
