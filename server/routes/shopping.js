require("dotenv").config();
const express = require("express");
const service = require("../utils/axios-instances-external");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("Chegou aqui");
  res.status(200).send("Hello user!");
});

module.exports = (app) => app.use("/api/shopping", router);
