import { createContext } from "react";
import { App, Locale } from "../../ldo/app.typings";

const AppContext = createContext<{
  app: App | null;
  currentLocale: string;
  availableLocales: Array<Locale>;
}>({
  app: null,
  currentLocale: "en-US",
  availableLocales: [],
});

export default AppContext;
