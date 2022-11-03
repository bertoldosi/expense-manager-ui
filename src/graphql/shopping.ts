import { hygraph, gql } from "@services/HygraphClient";

import { ShoppingType } from "@containers/Home/types";

const CREATE_SHOPPING = gql`
  mutation CreateShopping(
    $reference: String!
    $description: String!
    $responsible: String!
    $amount: String!
  ) {
    createShopping(
      data: {
        reference: $reference
        description: $description
        responsible: $responsible
        amount: $amount
      }
    ) {
      reference
    }
  }
`;

const UPDATE_SHOPPING = gql`
  mutation UpdateShopping(
    $reference: String!
    $description: String!
    $amount: String!
    $responsible: String!
    $payment_status: String!
  ) {
    updateShopping(
      data: {
        reference: $reference
        description: $description
        amount: $amount
        responsible: $responsible
        payment_status: $payment_status
      }
      where: { reference: $reference }
    ) {
      reference
    }
  }
`;

const DELETE_SHOPPING = gql`
  mutation DeleteShopping($reference: String!) {
    deleteShopping(where: { reference: $reference }) {
      reference
    }
  }
`;

export const createShopping = async (shopping: ShoppingType) => {
  const { createShopping } = await hygraph
    .request(CREATE_SHOPPING, {
      ...shopping,
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    ...createShopping,
  };
};

export const updateShopping = async (shopping: ShoppingType) => {
  const { updateShopping } = await hygraph
    .request(UPDATE_SHOPPING, {
      ...shopping,
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    ...updateShopping,
  };
};

export const deleteShopping = async (reference: string) => {
  const { deleteShopping } = await hygraph
    .request(DELETE_SHOPPING, {
      reference,
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    ...deleteShopping,
  };
};
