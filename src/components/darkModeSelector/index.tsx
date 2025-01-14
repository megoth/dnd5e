import React, { HTMLAttributes, useEffect } from "react";
import clsx from "clsx";
import Translation from "../translation";
import { prefersDarkModeScheme } from "../../utils/windowHelpers";
import { useLocalStorage } from "@uidotdev/usehooks";

export const TESTID_DARK_MODE_SELECTOR_BUTTON = "dark-mode-selector-button";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function DarkModeSelector({ className, ...props }: Props) {
  const [darkMode, setDarkMode] = useLocalStorage(
    "darkMode",
    prefersDarkModeScheme().toString(),
  );

  useEffect(() => {
    document
      .querySelector("html")
      .classList.toggle("dark", darkMode === true.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newValue =
      darkMode === true.toString() ? false.toString() : true.toString();
    setDarkMode(newValue.toString());
  };

  return (
    <button
      className={clsx("button", className)}
      type="button"
      onClick={toggleDarkMode}
      data-testid={TESTID_DARK_MODE_SELECTOR_BUTTON}
      {...props}
    >
      {darkMode === true.toString() ? (
        <span>
          💡&nbsp;
          <Translation id="darkModeTurnOff" />
        </span>
      ) : (
        <span>
          🌙&nbsp;
          <Translation id="darkModeTurnOn" />
        </span>
      )}
    </button>
  );
}
