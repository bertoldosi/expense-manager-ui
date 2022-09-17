import { hygraph, gql } from "../HygraphClient";
import { ShoppingType } from "../../components/container/HomeContainer/types";

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

const PUBLISH_SHOPPING = gql`
  mutation PublishShopping($shoppingReference: String!) {
    publishShopping(where: { reference: $shoppingReference }, to: PUBLISHED) {
      reference
    }
  }
`;

const UPDATE_INSTITUTION = gql`
  mutation UpdateInstitution(
    $institutionReference: String!
    $shoppingReference: String!
  ) {
    updateInstitution(
      data: {
        shoppings: { connect: { where: { reference: $shoppingReference } } }
      }
      where: { reference: $institutionReference }
    ) {
      reference
    }
  }
`;

const PUBLISH_INSTITUTION = gql`
  mutation PublishInstitution($institutionReference: String!) {
    publishInstitution(
      where: { reference: $institutionReference }
      to: PUBLISHED
    ) {
      reference
    }
  }
`;

export const createShopping = async (
  institutionReference: string,
  newShopping: ShoppingType
) => {
  const { createShopping } = await hygraph.request(CREATE_SHOPPING, {
    ...newShopping,
  });

  hygraph.request(PUBLISH_SHOPPING, {
    shoppingReference: createShopping.reference,
  });

  const { updateInstitution } = await hygraph.request(UPDATE_INSTITUTION, {
    institutionReference,
    shoppingReference: createShopping.reference,
  });

  hygraph.request(PUBLISH_INSTITUTION, {
    institutionReference: updateInstitution.reference,
  });

  return {
    ...createShopping,
  };
};
