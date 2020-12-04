import React, { createContext, ReactNode } from "react";
import { ResourceBundleModel } from "../../models/resourceBundle";

export const ResourceBundleContext = createContext({
  resourceBundle: null,
});

interface Props {
  children: ReactNode;
  resourceBundle: ResourceBundleModel;
}

export default function ResourceBundleProvider({
  children,
  resourceBundle,
}: Props) {
  return (
    <ResourceBundleContext.Provider value={{ resourceBundle }}>
      {children}
    </ResourceBundleContext.Provider>
  );
}
