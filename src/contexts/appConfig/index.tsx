import React, { createContext, ReactNode } from "react";

export const AppConfigContext = createContext({
  solidBase: "",
});

interface Props {
  children: ReactNode;
  solidBase: string;
}

export default function AppConfigProvider({ children, solidBase }: Props) {
  return (
    <AppConfigContext.Provider value={{ solidBase }}>
      {children}
    </AppConfigContext.Provider>
  );
}
