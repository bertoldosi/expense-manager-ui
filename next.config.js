require("dotenv").config();

module.exports = {
  compiler: {
    styledComponents: true,
  },
  publicRuntimeConfig: {
    BASE_URL_BFF: process.env.BASE_URL_BFF || "http://localhost:3000",

    CLIENT_ID: process.env.CLIENT_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  },
};
