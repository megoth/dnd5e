import React, { createContext, ReactNode } from "react";

export type SetMenuOpen = (menuOpen: boolean) => void;

export const LayoutContext = createContext<{
  full: boolean;
  leftOpen: boolean;
  rightOpen: boolean;
  setLeftOpen: SetMenuOpen;
  setRightOpen: SetMenuOpen;
}>({
  full: false,
  leftOpen: false,
  rightOpen: false,
  setLeftOpen: null,
  setRightOpen: null,
});

interface Props {
  children: ReactNode;
  full: boolean;
  leftOpen: boolean;
  rightOpen: boolean;
  setLeftOpen: SetMenuOpen;
  setRightOpen: SetMenuOpen;
}

export default function LayoutProvider({
  children,
  full,
  leftOpen,
  rightOpen,
  setRightOpen,
  setLeftOpen,
}: Props) {
  return (
    <LayoutContext.Provider
      value={{ full, leftOpen, rightOpen, setRightOpen, setLeftOpen }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
