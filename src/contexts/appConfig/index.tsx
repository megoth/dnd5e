import React, { createContext, ReactNode, useContext } from "react";

const AppConfigContext = createContext({
  errorsUrl: "",
  solidBaseUrl: "",
  translationsUrl: "",
});

export function useAppConfig() {
  return useContext(AppConfigContext);
}

interface Props {
  children: ReactNode;
  appConfig: {
    errorsUrl: string;
    solidBaseUrl: string;
    translationsUrl: string;
  };
}

export default function AppConfigProvider({ children, appConfig }: Props) {
  return (
    <AppConfigContext.Provider value={appConfig}>
      {children}
    </AppConfigContext.Provider>
  );
}
