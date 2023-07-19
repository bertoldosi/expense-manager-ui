import handleError from "@helpers/handleError";
import { ShoppingType } from "@interfaces/*";

import { NextApiRequest, NextApiResponse } from "next";
import updateInstitutionTotals from "../institution/updateInstitutionTotals";
import { shoppingSchema } from ".";
import updateExpenseTotals from "../expense/updateExpenseTotals";

interface CreateShoppingType {
  shopping: ShoppingType;
  institutionId: string;
}

async function createShopping(req: NextApiRequest, res: NextApiResponse) {
  const { institutionId, shopping } = req.body as unknown as CreateShoppingType;

  try {
    await shoppingSchema.validate(shopping, { abortEarly: false });

    const institution = await prisma.institution.findUnique({
      where: {
        id: institutionId,
      },
      include: {
        expense: true,
      },
    });

    const shoppingUpdate = await prisma.shopping.create({
      data: {
        ...shopping,
        institutionId,
      },
    });

    await updateInstitutionTotals(shoppingUpdate.institutionId);

    if (institution?.expenseId) {
      await updateExpenseTotals(institution.expenseId);
    }

    return res.status(200).json(shoppingUpdate);
  } catch (err) {
    return handleError(res, err);
  }
}

export default createShopping;
