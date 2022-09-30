import getConfig from "next/config";
export { gql } from "graphql-request";
import { GraphQLClient } from "graphql-request";

const { publicRuntimeConfig = {} } = getConfig() || {};

const HYGRAPH_PROJECT_API = publicRuntimeConfig.HYGRAPH_PROJECT_API;
const HYGRAPH_PROJECT_TOKEN = publicRuntimeConfig.HYGRAPH_PROJECT_TOKEN;

export const hygraph = new GraphQLClient(HYGRAPH_PROJECT_API, {
  headers: {
    Authorization: `Bearer ${HYGRAPH_PROJECT_TOKEN}`,
  },
});
