import { useContext, useEffect } from "react";
import { AppContext } from "../../contexts/app";
import { appIsLoadingLocalizations } from "../../models/app";

export default function useApp(bundles: string[] = []) {
  const { app, setBundles } = useContext(AppContext);
  useEffect(() => {
    if (!app || !appIsLoadingLocalizations(app, bundles)) {
      return;
    }
    setBundles(bundles);
  }, [app, bundles, setBundles]);
  return app;
}
