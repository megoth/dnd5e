import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { LocalizationProvider, ReactLocalization } from "@fluent/react";
import { getLocale } from "../../utils/language";
import AppContext from "./context";
import useSWR from "swr";
import Loading from "../../components/loading";
import {
  AppShapeType,
  LocaleShapeType,
  ResourceBundleShapeType,
  TranslationShapeType,
  TranslationsIndexShapeType,
} from "../../ldo/app.shapeTypes";
import { SessionInfo, useLdo, useSolidAuth } from "@ldo/solid-react";
import { hash, resourceUrl } from "../../utils/url";
import { useSearchParams } from "react-router-dom";
import { FluentBundle, FluentResource } from "@fluent/bundle";
import { userIsAdmin } from "../../utils/session";
import { namedNode } from "@rdfjs/data-model";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Literal } from "@rdfjs/types";

interface Props {
  children: ReactNode;
}

function getBundles(session: SessionInfo): string[] {
  return userIsAdmin(session) ? ["global", "admin"] : ["global"];
}

export default function AppProvider({ children }: Props) {
  const { session } = useSolidAuth();
  const { dataset, getResource, getSubject } = useLdo();
  const [searchParams] = useSearchParams();
  const [currentLocale, setCurrentLocale] = useLocalStorage("locale", "en-US");
  const [bundles, setBundles] = useState<string[]>(getBundles(session));

  useEffect(() => {
    setBundles(getBundles(session));
  }, [session]);

  // fetch app index
  const { data: app } = useSWR("app", async () => {
    const appUrl =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      import.meta.env.VITE_APP_URL ||
      new URL("/data/index.ttl#dnd5e", location.origin).toString();
    const path = resourceUrl(appUrl);
    await getResource(path).readIfUnfetched();
    return getSubject(AppShapeType, appUrl);
  });

  // fetch resource bundles
  const { data: resourceBundles } = useSWR(
    () => `resourceBundles-${app["@id"]}}-${bundles.join("-")}`,
    async () =>
      (
        await Promise.all(
          app.resourceBundle.map(async (bundle) => {
            await getResource(bundle["@id"]).readIfUnfetched();
            return getSubject(ResourceBundleShapeType, bundle["@id"]);
          }),
        )
      ).filter((bundle) => bundles.indexOf(bundle.label) !== -1),
  );

  // fetch supported languages
  const { data: supportedLocales } = useSWR(
    () => `supportedLocales-${app["@id"]}}`,
    async () => {
      return Promise.all(
        app.supportLanguage.map(async (language) => {
          await getResource(language["@id"]).readIfUnfetched();
          return getSubject(LocaleShapeType, language["@id"]);
        }),
      );
    },
  );

  useEffect(() => {
    if (!supportedLocales) return;
    // TODO: FIX so that you can load translations directly
    const requestedLocale = searchParams.get("locale");
    const locale = getLocale(
      (Array.isArray(requestedLocale) ? requestedLocale[0] : requestedLocale) ||
        currentLocale,
      supportedLocales?.map((locale) => locale.language),
    );
    setCurrentLocale(locale);
  }, [searchParams.get("locale"), supportedLocales, currentLocale]);

  // fetch FAQs
  const { isLoading: faqIsLoading } = useSWR(
    () => `faqs-${resourceBundles.map((b) => b["@id"]).join("-")}}`,
    async () =>
      Promise.all(
        resourceBundles
          .flatMap((bundle) => bundle.faqIndex)
          .map(async (index) => getResource(index["@id"]).readIfUnfetched()),
      ),
  );

  // fetch translation indices
  const { data: translations } = useSWR(
    () =>
      `translationsIndices-${resourceBundles.map((b) => b["@id"]).join("-")}-${currentLocale}`,
    async () => {
      return (
        await Promise.all(
          resourceBundles
            .flatMap((bundle) => bundle.translationsIndex)
            .map(async (index) => {
              await getResource(index["@id"]).readIfUnfetched();
              return getSubject(TranslationsIndexShapeType, index["@id"]);
            }),
        )
      ).filter((index) => !index.language || index.language === currentLocale);
    },
  );

  // get translations
  const { isLoading: translationsLoading } = useSWR(
    () => `translations-${translations.map((t) => t["@id"]).join("-")}}`,
    async () =>
      Promise.all(
        translations
          .map((index) => index.translationsResource)
          .map(async (resourceUrl) => {
            return getResource(resourceUrl["@id"]).readIfUnfetched();
          }),
      ),
  );
  const localization = useMemo(() => {
    const localization = new FluentBundle(currentLocale);
    if (!resourceBundles || translationsLoading) return null;
    resourceBundles.forEach((bundle) =>
      bundle.translationsIndex
        .map((index) => index.translationsResource["@id"])
        .flatMap((resourceUrl) => {
          return dataset
            .match(null, null, null, namedNode(resourceUrl))
            .toArray()
            .filter(
              (quad) =>
                (quad.object as Literal).language ===
                currentLocale.toLowerCase(),
            )
            .map((quad) =>
              getSubject(TranslationShapeType, quad.subject.value),
            );
        })
        .forEach((translation) =>
          localization.addResource(
            new FluentResource(
              `${hash(translation["@id"])} = ${translation.definition}`,
            ),
          ),
        ),
    );
    return new ReactLocalization([localization]);
  }, [currentLocale, resourceBundles, dataset, translationsLoading]);

  if (translationsLoading || faqIsLoading || !translations || !localization) {
    return <Loading />;
  }

  return (
    <AppContext.Provider
      value={{
        app,
        currentLocale,
        availableLocales: supportedLocales?.filter(
          (locale) => locale.language !== currentLocale,
        ),
      }}
    >
      <LocalizationProvider l10n={localization}>
        {children}
      </LocalizationProvider>
    </AppContext.Provider>
  );
}
