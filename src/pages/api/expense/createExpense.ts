import prisma from "@services/prisma";
import handleError from "@helpers/handleError";
import { NextApiRequest, NextApiResponse } from "next";

interface CreateShoppingType {
  name: string;
  userEmail: string;
}

async function createExpense(req: NextApiRequest, res: NextApiResponse) {
  const { name, userEmail } = req.body as CreateShoppingType;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    const expenseExists = await prisma.$transaction(async (prisma) => {
      const existingExpense = await prisma.expense.findFirst({
        where: {
          name,
          userId: user?.id,
        },
      });

      return existingExpense;
    });

    if (expenseExists) {
      return res.status(405).send("Not allowed. Name already registered!");
    }

    const expense = await prisma.expense.create({
      data: {
        name,
        userId: user?.id,
      },
    });

    return res.status(200).send(expense);
  } catch (err) {
    return handleError(res, err);
  }
}

export default createExpense;
