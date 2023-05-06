import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig = {} } = getConfig() || {};

const BASE_URL_BFF = publicRuntimeConfig.BASE_URL_BFF;

const instances = axios.create({
  baseURL: `${BASE_URL_BFF}/api`,
});

export default instances;
