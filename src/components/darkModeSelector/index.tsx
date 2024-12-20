import React, { HTMLAttributes, useEffect, useState } from "react";
import clsx from "clsx";
import Translation from "../translation";
import { prefersDarkModeScheme } from "../../utils/windowHelpers";

export const TESTID_DARK_MODE_SELECTOR_BUTTON = "dark-mode-selector-button";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function DarkModeSelector({ className, ...props }: Props) {
  const [darkMode, setDarkMode] = useState<boolean>(prefersDarkModeScheme());

  useEffect(() => {
    document.querySelector("html").classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newValue = !darkMode;
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
