const axios = require("axios");

const APPID = process.env.APPID;

const service = axios.create({
  baseURL: "https://api-gateway-clima-tempo.herokuapp.com/",
  params: {
    appid: APPID,
  },
});

module.exports = service;
