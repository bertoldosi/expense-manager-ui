import expenseCalculateCategoryTotals from "@helpers/expenseCalculateCategoryTotals";
import { ExpenseType } from "@interfaces/*";

async function updateExpenseTotals(expenseId: string) {
  const expense: ExpenseType | null = await prisma.expense.findUnique({
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
