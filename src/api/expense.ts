import { NewExpenseType } from "@interfaces/*";
import instances from "src/lib/axios-instance-bff";

export const createExpense = async (expense: NewExpenseType) => {
  return instances.post("/expense", expense);
};

export const getExpense = async (id: string) => {
  return instances.get("/expense", {
    params: {
      id,
    },
  });
};
