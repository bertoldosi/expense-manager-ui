import getConfig from "next/config";

const { publicRuntimeConfig = {} } = getConfig() || {};

const HYGRAPH_PROJECT_API = publicRuntimeConfig.HYGRAPH_PROJECT_API;
const HYGRAPH_PROJECT_TOKEN = publicRuntimeConfig.HYGRAPH_PROJECT_TOKEN;

import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: HYGRAPH_PROJECT_API,
  headers: {
    Authorization: `Bearer ${HYGRAPH_PROJECT_TOKEN}`,
  },
  cache: new InMemoryCache(),
});
