import React, { createContext, ReactNode } from "react";

type SetMenuOpen = (menuOpen: boolean) => void;

export const LayoutContext = createContext<{
  leftOpen: boolean;
  rightOpen: boolean;
  setLeftOpen: SetMenuOpen;
  setRightOpen: SetMenuOpen;
}>({
  leftOpen: false,
  rightOpen: false,
  setLeftOpen: null,
  setRightOpen: null,
});

interface Props {
  children: ReactNode;
  leftOpen: boolean;
  rightOpen: boolean;
  setLeftOpen: SetMenuOpen;
  setRightOpen: SetMenuOpen;
}

export default function LayoutProvider({
  children,
  leftOpen,
  rightOpen,
  setRightOpen,
  setLeftOpen,
}: Props) {
  return (
    <LayoutContext.Provider
      value={{ leftOpen, rightOpen, setRightOpen, setLeftOpen }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
