export type Page = {
  href: string;
  text?: string;
  translationId?: string;
  bundle?: string;
  children?: Array<Page>;
};

export function getPages(path: string, admin: boolean): Array<Page> {
  return [
    {
      href: "/characters",
      translationId: "charactersPageTitle",
      children: path.startsWith("/characters")
        ? [
            {
              href: "/characters/encounters",
              translationId: "encountersPageTitle",
            },
            {
              href: "/characters/notes",
              translationId: "notesPageTitle",
            },
          ]
        : [],
    },
    {
      href: "/rules",
      translationId: "rulesPageTitle",
    },
    {
      href: "/classes",
      translationId: "classesPageTitle",
    },
    {
      href: "/races",
      translationId: "racesPageTitle",
    },
    {
      href: "/equipment",
      translationId: "equipmentPageTitle",
    },
    {
      href: "/weapons",
      translationId: "weapons",
    },
    {
      href: "/spells",
      translationId: "spellsPageTitle",
    },
    {
      href: "/monsters",
      translationId: "monstersPageTitle",
    },
    ...(admin
      ? [
          {
            href: "/admin",
            translationId: "adminPageTitle",
            bundle: "admin",
            children: path.startsWith("/admin")
              ? [
                  {
                    href: "/admin/languages",
                    translationId: "languagesPageTitle",
                    bundle: "admin",
                  },
                  {
                    href: "/admin/translations",
                    translationId: "translationsPageTitle",
                    bundle: "admin",
                  },
                  {
                    href: "/admin/errors",
                    translationId: "errorsPageTitle",
                    bundle: "admin",
                  },
                  {
                    href: "/admin/faq",
                    translationId: "faqShort",
                  },
                ]
              : [],
          },
        ]
      : []),
    {
      href: "/faq",
      translationId: "faqShort",
      children: [],
    },
    {
      href: "/about",
      translationId: "aboutPageTitle",
    },
  ];
}
