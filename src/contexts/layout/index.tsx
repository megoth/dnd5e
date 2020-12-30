import React, { createContext, ReactNode } from "react";

export const LayoutContext = createContext<{
  setSubMenuOpen: Function;
}>({
  setSubMenuOpen: null,
});

interface Props {
  children: ReactNode;
  setSubMenuOpen: (subMenuOpen: boolean) => void;
}

export default function LayoutProvider({ children, setSubMenuOpen }: Props) {
  return (
    <LayoutContext.Provider value={{ setSubMenuOpen }}>
      {children}
    </LayoutContext.Provider>
  );
}
