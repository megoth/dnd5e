export type Page = {
  href: string;
  text?: string;
  translationId?: string;
  bundle?: string;
  children?: Array<Page>;
};

export function getPages(_: string, _2: boolean): Array<Page> {
  return [
    {
      href: "/you",
      translationId: "yourStuff",
      children: [
        {
          href: "/characters",
          translationId: "charactersPageTitle",
        },
        {
          href: "/storages",
          translationId: "storages",
        },
      ],
    },
    {
      href: "/classes",
      translationId: "classesPageTitle",
      children: [
        {
          href: "/subclasses",
          translationId: "subclasses",
        },
      ],
    },
    {
      href: "/races",
      translationId: "racesPageTitle",
      children: [
        {
          href: "/subraces",
          translationId: "subraces",
        },
      ],
    },
    {
      href: "/equipment",
      translationId: "equipmentPageTitle",
      children: [
        {
          href: "/armor",
          translationId: "armor",
        },
        {
          href: "/magic-items",
          translationId: "magicItems",
        },
        {
          href: "/weapons",
          translationId: "weapons",
        },
      ],
    },
    {
      href: "/spells",
      translationId: "spellsPageTitle",
    },
    {
      href: "/skills",
      translationId: "skills",
    },
    {
      href: "/monsters",
      translationId: "monstersPageTitle",
    },
    {
      href: "/rules",
      translationId: "rulesPageTitle",
    },
    {
      href: "/about",
      translationId: "aboutPageTitle",
      children: [
        {
          href: "/faq",
          translationId: "faqShort",
        },
        {
          href: "/settings",
          translationId: "settings",
        },
      ],
    },
  ];
}
