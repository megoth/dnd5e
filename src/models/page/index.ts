export type Page = {
  href: string;
  translationId: string;
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
      children: path.startsWith("/rules")
        ? [
            {
              href: "/rules/classes",
              translationId: "classesPageTitle",
            },
            {
              href: "/rules/races",
              translationId: "racesPageTitle",
            },
            {
              href: "/rules/equipment",
              translationId: "equipmentPageTitle",
            },
            {
              href: "/rules/spells",
              translationId: "spellsPageTitle",
            },
            {
              href: "/rules/monsters",
              translationId: "monstersPageTitle",
            },
          ]
        : [],
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
    },
    {
      href: "/about",
      translationId: "aboutPageTitle",
    },
  ];
}
