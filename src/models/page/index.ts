export type Page = {
  href: string;
  translationId: string;
  bundle?: string;
};

export function getSubPages(path): Array<Page> {
  switch (true) {
    case path.startsWith("/admin"):
      return [
        {
          href: "/admin",
          translationId: "adminPageTitle",
          bundle: "admin",
        },
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
          translationId: "faqsPageTitle",
          bundle: "admin",
        },
      ];
    case path.startsWith("/characters"):
      return [
        {
          href: "/characters",
          translationId: "charactersPageTitle",
        },
        {
          href: "/characters/encounters",
          translationId: "encountersPageTitle",
        },
        {
          href: "/characters/notes",
          translationId: "notesPageTitle",
        },
      ];
    case path.startsWith("/rules"):
      return [
        {
          href: "/rules",
          translationId: "rulesPageTitle",
        },
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
      ];
    default:
      return [];
  }
}
