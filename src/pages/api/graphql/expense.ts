import { gql } from "@services/HygraphClient";

export const GET_EXPENSES = gql`
  query Expenses {
    expenses {
      id
      name
      persons {
        email
      }
      institutions {
        id
        name
        amount
        shoppings {
          id
          description
          amount
          createdAt
        }
      }
    }
  }
`;

export const GET_EXPENSE = gql`
  query Expense($id: ID!) {
    expense(where: { id: $id }) {
      id
      name
      institutions {
        id
        name
        amount
        shoppings(first: 5000, orderBy: createdAt_DESC) {
          id
          description
          responsible
          amount
        }
      }
    }
  }
`;

export const CREATE_EXPENSE = gql`
  mutation CreateExpense($name: String!, $email: String!) {
    createExpense(
      data: { name: $name, persons: { connect: { Person: { email: $email } } } }
    ) {
      id
    }
  }
`;
