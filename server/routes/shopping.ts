require("dotenv").config();

import { Router } from "express";
import { updateInstitutionShopping } from "../../src/graphql/institution";
import { createShopping } from "../../src/graphql/shopping";
const router = Router();

router.post("/", async (req, res) => {
  const { institutionId, shopping } = req.body;

  const { reference } = await createShopping(shopping);
  const newShopping = await updateInstitutionShopping(institutionId, reference);

  res.status(200).send(newShopping);
});

export default router;
