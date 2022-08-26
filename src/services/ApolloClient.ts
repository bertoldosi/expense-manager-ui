import getConfig from "next/config";

const { publicRuntimeConfig = {} } = getConfig() || {};
const HYGRAPH_PROJECT_API = publicRuntimeConfig.HYGRAPH_PROJECT_API;

import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: HYGRAPH_PROJECT_API,
  cache: new InMemoryCache(),
});
