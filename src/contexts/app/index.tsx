import React, { createContext, ReactNode } from "react";
import { AppModel } from "../../models/app";

export const AppContext = createContext<{
  app: AppModel;
  setBundles: Function;
  setLocale: Function;
}>({
  app: null,
  setBundles: () => {},
  setLocale: () => {},
});

interface Props {
  children: ReactNode;
  app: AppModel;
  setBundles: Function;
  setLocale: Function;
}

export default function AppProvider({
  children,
  app,
  setBundles,
  setLocale,
}: Props) {
  return (
    <AppContext.Provider value={{ app, setBundles, setLocale }}>
      {children}
    </AppContext.Provider>
  );
}
