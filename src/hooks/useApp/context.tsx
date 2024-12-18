import { createContext } from "react";
import { Locale } from "../../ldo/app.typings";

const AppContext = createContext<{
  currentLocale: string;
  availableLocales: Array<Locale>;
}>({
  currentLocale: "en-US",
  availableLocales: [],
});

export default AppContext;
