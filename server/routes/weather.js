require("dotenv").config();
const express = require("express");
const service = require("../utils/axios-instances-external");
const router = express.Router();

const APPID = process.env.APPID;

router.get("/", async (req, res) => {
  res.status(200).send("Hello user!");
});

module.exports = (app) => app.use("/api/hello", router);
