import getConfig from "next/config";
const { publicRuntimeConfig = {} } = getConfig() || {};

const HYGRAPH_PROJECT_API = publicRuntimeConfig.HYGRAPH_PROJECT_API;
const HYGRAPH_PROJECT_TOKEN = publicRuntimeConfig.HYGRAPH_PROJECT_TOKEN;

export const HYGRAPH_URL = HYGRAPH_PROJECT_API;
export const HYGRAPH_PERMANENTAUTH_TOKEN = HYGRAPH_PROJECT_TOKEN;
