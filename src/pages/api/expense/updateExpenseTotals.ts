import prisma from "@services/prisma";
import expenseCalculateCategoryTotals from "@helpers/expenseCalculateCategoryTotals";

async function updateExpenseTotals(expenseId: string) {
  const expense = await prisma.expense.findUnique({
    where: {
      id: expenseId,
    },
    include: {
      institutions: {
        include: {
          shoppings: true,
        },
      },
    },
  });

  if (!expense) {
    throw new Error("Expense not found");
  }

  const expenseUpdate = expenseCalculateCategoryTotals(expense);

  try {
    await prisma.expense.update({
      where: {
        id: expenseId,
      },
      data: {
        totalAmount: expenseUpdate.totalAmount,
        categoryTotals: expenseUpdate.categoryTotals,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export default updateExpenseTotals;
