import handleError from "@helpers/handleError";
import { ShoppingType } from "@interfaces/*";
import prisma from "@services/prisma";

import { NextApiRequest, NextApiResponse } from "next";
import updateInstitutionTotals from "../institution/updateInstitutionTotals";
import { shoppingSchema } from ".";
import updateExpenseTotals from "../expense/updateExpenseTotals";

interface CreateShoppingType {
  shopping: ShoppingType;
  institutionId: string;
}

async function updateInstitutionAndExpense(institutionId: string) {
  const institution = await prisma.institution.findUnique({
    where: {
      id: institutionId,
    },
    include: {
      expense: true,
    },
  });

  if (!institution) {
    throw new Error("Institution not found");
  }

  await updateInstitutionTotals(institutionId);
  await updateExpenseTotals(institution.expenseId!!);
}

async function createShopping(req: NextApiRequest, res: NextApiResponse) {
  const { institutionId, shopping } = req.body as unknown as CreateShoppingType;

  try {
    await shoppingSchema.validate(shopping, { abortEarly: false });
    const shoppingUpdate = await prisma.shopping.create({
      data: {
        ...shopping,
        institutionId,
      },
    });

    await updateInstitutionAndExpense(shoppingUpdate.institutionId);

    return res.status(200).json(shoppingUpdate);
  } catch (err) {
    return handleError(res, err);
  }
}

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { institutionId, shopping } = req.body as unknown as CreateShoppingType;

  if (institutionId && shopping) {
    return await createShopping(req, res);
  }

  return res.status(400).json({
    error: "Missing 'institutionId' or 'shopping list' in the request query.",
  });
}

export default handle;
