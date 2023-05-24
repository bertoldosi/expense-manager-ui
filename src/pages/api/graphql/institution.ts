import { gql } from "@services/HygraphClient";

export const CREATE_INSTITUTION = gql`
  mutation CreateInstitution($expenseId: ID, $name: String!) {
    updateExpense(
      where: { id: $expenseId }
      data: { institutions: { create: { name: $name } } }
    ) {
      id
    }
  }
`;
