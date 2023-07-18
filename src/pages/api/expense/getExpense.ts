import handleError from "@helpers/handleError";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@services/prisma";

interface GetExpenseIdType {
  id: string;
  institutionsCreateAt: string;
}

async function getExpense(req: NextApiRequest, res: NextApiResponse) {
  const { id, institutionsCreateAt } = req.query as unknown as GetExpenseIdType;

  if (id && institutionsCreateAt) {
    try {
      const institutions = await prisma.institution.findMany({
        where: {
          createAt: institutionsCreateAt,
          expenseId: id,
        },
        include: {
          shoppings: {
            orderBy: {
              createAt: "desc",
            },
          },
        },
      });

      const expense = await prisma.expense.findUnique({
        where: {
          id,
        },
      });

      const newExpense = {
        ...expense,
        institutions: institutions,
      };

      return res.status(200).send(newExpense);
    } catch (err) {
      return handleError(res, err);
    }
  }

  return res.status(400).json({
    error: "Missing 'id' and 'institutionsCreateAt' in the request query.",
  });
}

export default getExpense;
