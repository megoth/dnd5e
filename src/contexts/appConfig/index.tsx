import React, { createContext, ReactNode, useContext } from "react";

const AppConfigContext = createContext({
  errorsUrl: "",
  translationsUrl: "",
});

export function useAppConfig() {
  return useContext(AppConfigContext);
}

interface Props {
  children: ReactNode;
  errorsUrl: string;
  translationsUrl: string;
}

export default function AppConfigProvider({
  children,
  errorsUrl,
  translationsUrl,
}: Props) {
  return (
    <AppConfigContext.Provider value={{ errorsUrl, translationsUrl }}>
      {children}
    </AppConfigContext.Provider>
  );
}
