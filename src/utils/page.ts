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
      href: "/characters",
      translationId: "charactersPageTitle",
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
      children: [
        {
          href: "/weapons",
          translationId: "weapons",
        },
        {
          href: "/armor",
          translationId: "armor",
        },
      ],
    },
    {
      href: "/spells",
      translationId: "spellsPageTitle",
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
      ],
    },
  ];
}
