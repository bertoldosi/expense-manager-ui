import { NewExpenseType } from "@interfaces/*";
import { gql } from "graphql-request";
import instances from "src/lib/axios-instance-bff";

export const createExpense = async (expense: NewExpenseType) => {
  console.log(expense);
  return instances.post("/expense", expense);
};

export const getExpense = async (id: string) => {
  try {
    const requestBody = {
      query: gql`
        query Expense($id: ID!) {
          expense(where: { id: $id }) {
            id
            name
            institutions {
              id
              name
              amount
              shoppings {
                id
                description
                amount
              }
            }
          }
        }
      `,
      variables: {
        id,
      },
    };

    const response = await instances.post("", requestBody);
    const { data } = response.data;

    return data;
  } catch (err) {
    console.log("ERROR AXIOS REQUEST", err);
    return err;
  }
};
