import {
  ClientConfig,
  createClient,
  createPreviewSubscriptionHook,
} from "next-sanity";

const config: ClientConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  useCdn: process.env.NODE_ENV === "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
};

export const usePreviewSubscription = createPreviewSubscriptionHook(config);
export const client = createClient(config);
export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
});

export const getClient = (usePreview: boolean) =>
  usePreview ? previewClient : client;
export default client;
