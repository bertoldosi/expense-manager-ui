import * as yup from "yup";
import handleError from "@helpers/handleError";
import { ShoppingType } from "@interfaces/*";

import { NextApiRequest, NextApiResponse } from "next";
import updateInstitutionTotals from "../institution/updateInstitutionTotals";
import { shoppingSchema } from ".";

interface CreateShoppingType {
  shopping: ShoppingType;
  institutionId: string;
}

async function createShopping(req: NextApiRequest, res: NextApiResponse) {
  const { institutionId, shopping } = req.body as unknown as CreateShoppingType;

  try {
    await shoppingSchema.validate(shopping, { abortEarly: false });

    const newShopping = await prisma.shopping.create({
      data: {
        ...shopping,
        institutionId,
      },
    });

    await updateInstitutionTotals(newShopping.institutionId);

    return res.status(200).send(newShopping);
  } catch (err) {
    return handleError(res, err);
  }
}

export default createShopping;
