type ProviderModel = {
  label: string;
  logoSrc: string;
  loginIri: string;
  signupIri: string;
};

// eslint-disable-next-line import/prefer-default-export
export function getProviders(): Array<ProviderModel> {
  return [
    {
      label: "solidcommunity.net",
      logoSrc: "/logos/solid-emblem.svg",
      loginIri: "https://solidcommunity.net/",
      signupIri: "https://solidcommunity.net/register",
    },
    {
      label: "inrupt.net",
      logoSrc: "/logos/solid-emblem.svg",
      loginIri: "https://inrupt.net/",
      signupIri: "https://inrupt.net/register",
    },
  ];
}
