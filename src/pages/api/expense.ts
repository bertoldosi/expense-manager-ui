import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@services/prisma";

interface GetExpenseIdType {
  id: string;
  institutionsCreateAt: string;
}

interface DeleteExpenseType {
  id: string;
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
      console.log("ERROR AXIOS REQUEST", err);
      return res.send(err);
    }
  }
}

async function createExpense(req: NextApiRequest, res: NextApiResponse) {
  const { name, userEmail } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    const expense = await prisma.expense.create({
      data: {
        name,
        userId: user?.id,
      },
    });

    return res.status(200).send(expense);
  } catch (err) {
    console.log("ERROR AXIOS REQUEST", err);
    return res.send(err);
  }
}

async function updateExpense(req: NextApiRequest, res: NextApiResponse) {
  const { id, name } = req.body;

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
    console.log("ERROR AXIOS REQUEST", err);
    return res.send(err);
  }
}

async function deleteExpense(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as unknown as DeleteExpenseType;

  try {
    const institutions = await prisma.institution.findMany({
      where: {
        expenseId: id,
      },
    });

    if (institutions.length > 0) {
      return res
        .status(405)
        .send(
          "Not Allowed. Before deleting this expense, please delete the cards linked to it!"
        );
    }

    await prisma.expense.delete({
      where: {
        id,
      },
    });

    return res.status(204).send("ok");
  } catch (err) {
    console.log("ERROR AXIOS REQUEST", err);
    return res.send(err);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await getExpense(req, res);
      break;

    case "POST":
      await createExpense(req, res);
      break;

    case "PUT":
      await updateExpense(req, res);
      break;

    case "DELETE":
      await deleteExpense(req, res);
      break;

    default:
      return res.send({
        message: "REQUEST IS NOT DEFINED",
        method: req.method,
      });
  }
}
