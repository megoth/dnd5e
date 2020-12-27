import React, { HTMLAttributes, useState } from "react";
import clsx from "clsx";
import Translation from "../translation";
import { prefersDarkModeScheme } from "../../src/windowHelpers";

export const TESTID_DARK_MODE_SELECTOR_BUTTON = "dark-mode-selector-button";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function DarkModeSelector({ className, ...props }: Props) {
  const [darkMode, setDarkMode] = useState<boolean>(prefersDarkModeScheme());

  const toggleDarkMode = () => {
    const newValue = !darkMode;
    document.querySelector("html").classList.toggle("dark", newValue);
    localStorage.setItem("darkMode", newValue.toString());
    setDarkMode(newValue);
  };

  return (
    <button
      className={clsx("button", className)}
      type="button"
      onClick={toggleDarkMode}
      data-testid={TESTID_DARK_MODE_SELECTOR_BUTTON}
      {...props}
    >
      {darkMode ? (
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

DarkModeSelector.defaultProps = {
  className: null,
};
