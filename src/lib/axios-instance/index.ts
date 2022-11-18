import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig = {} } = getConfig() || {};

const HYGRAPH_PROJECT_TOKEN = publicRuntimeConfig.HYGRAPH_PROJECT_TOKEN;
const URL = publicRuntimeConfig.HYGRAPH_PROJECT_API;

const instances = axios.create({
  baseURL: URL,
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${HYGRAPH_PROJECT_TOKEN}`,
  },
});

export default instances;
