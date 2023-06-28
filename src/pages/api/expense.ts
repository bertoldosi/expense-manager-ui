import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@services/prisma";

import instances from "src/lib/axios-instance";
import { GET_EXPENSE, GET_EXPENSES } from "./graphql/expense";

async function getExpense(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    try {
      const expense = await prisma.expense.findUnique({
        where: {
          id,
        },
      });

      return res.status(200).send(expense);
    } catch (err) {
      console.log("ERROR AXIOS REQUEST", err);
      return res.send(err);
    }
  }

  try {
    const requestBody = {
      query: GET_EXPENSES,
    };

    const response = await instances.post("", requestBody);
    const { data } = response.data;

    return res.status(200).send(data.expenses);
  } catch (err) {
    console.log("ERROR AXIOS REQUEST", err);
    return res.send(err);
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

    default:
      return res.send({
        message: "REQUEST IS NOT DEFINED",
        method: req.method,
      });
  }
}
