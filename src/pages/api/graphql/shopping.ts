import { gql } from "@services/HygraphClient";

export const CREATE_SHOPPING = gql`
  mutation CreateShopping(
    $institutionId: ID
    $shopping: [ShoppingCreateInput!]
  ) {
    updateInstitution(
      data: { shoppings: { create: $shopping } }
      where: { id: $institutionId }
    ) {
      id
    }
  }
`;
