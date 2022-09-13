require("dotenv").config();

module.exports = {
  compiler: {
    styledComponents: true,
  },
  publicRuntimeConfig: {
    HYGRAPH_PROJECT_API: process.env.HYGRAPH_PROJECT_API,
    HYGRAPH_PROJECT_TOKEN: process.env.HYGRAPH_PROJECT_TOKEN,
  },
};
