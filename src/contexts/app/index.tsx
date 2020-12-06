import React, { createContext, ReactNode } from "react";
import { AppModel } from "../../models/app";

export const AppContext = createContext(null);

interface Props {
  children: ReactNode;
  app: AppModel;
}

export default function AppProvider({ children, app }: Props) {
  return <AppContext.Provider value={app}>{children}</AppContext.Provider>;
}
