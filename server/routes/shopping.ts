require("dotenv").config();

import { Router } from "express";
const router = Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const { institutionId, shopping } = req.body;

  // const newShopping = createShopping(institutionId, shopping);

  res.status(200).send();
});

export default router;
