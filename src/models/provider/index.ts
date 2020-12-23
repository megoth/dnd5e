type ProviderModel = {
  label: string;
  iri: string;
  signupIri: string;
};

// eslint-disable-next-line import/prefer-default-export
export function getProviders(): Array<ProviderModel> {
  return [
    {
      label: "Inrupt Pod Spaces",
      iri: "https://broker.pod.inrupt.com/",
      signupIri: "https://signup.pod.inrupt.com/",
    },
    {
      label: "solidcommunity.net",
      iri: "https://solidcommunity.net/",
      signupIri: "https://solidcommunity.net/register",
    },
    {
      label: "inrupt.net",
      iri: "https://inrupt.net/",
      signupIri: "https://inrupt.net/register",
    },
  ];
}
