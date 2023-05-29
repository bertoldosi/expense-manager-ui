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

export const GET_INSTITUTION = gql`
  query GetInstitution($id: ID) {
    institution(where: { id: $id }) {
      id
      name
      amount
      shoppings(first: 5000, orderBy: createdAt_DESC) {
        id
        description
        amount
        responsible
        createdAt
      }
    }
  }
`;

export const GET_INSTITUTIONS_FOR_NAME = gql`
  query GetInstitutionForName($expenseId: ID, $institutionName: String) {
    expense(where: { id: $expenseId }) {
      institutions(where: { name: $institutionName }) {
        id
        name
      }
    }
  }
`;
