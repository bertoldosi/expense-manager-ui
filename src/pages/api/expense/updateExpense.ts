import prisma from "@services/prisma";
import handleError from "@helpers/handleError";
import { NextApiRequest, NextApiResponse } from "next";

interface UpdateShoppingType {
  id: string;
  name: string;
}

async function updateExpense(req: NextApiRequest, res: NextApiResponse) {
  const { id, name } = req.body as UpdateShoppingType;

  try {
    const newExpense = await prisma.expense.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return res.status(200).send(newExpense);
  } catch (err) {
    return handleError(res, err);
  }
}

export default updateExpense;
