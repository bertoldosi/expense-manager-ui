import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig = {} } = getConfig() || {};

const BASE_URL = publicRuntimeConfig.BASE_URL;

export const instance = axios.create({
  baseURL: `${BASE_URL}`,
  headers: { "Content-Type": "application/json" },
  timeout: 3000,
});
