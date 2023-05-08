require("dotenv").config();

module.exports = {
  compiler: {
    styledComponents: true,
  },
  publicRuntimeConfig: {
    BASE_URL_BFF: process.env.BASE_URL_BFF || "http://localhost:3000",
    HYGRAPH_PROJECT_API: process.env.HYGRAPH_PROJECT_API,
    HYGRAPH_PROJECT_TOKEN: process.env.HYGRAPH_PROJECT_TOKEN,
    CLIENT_ID: process.env.CLIENT_ID,
  },
};
