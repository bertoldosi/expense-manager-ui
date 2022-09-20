import { hygraph, gql } from "../services/HygraphClient";

import { InstitutionType } from "../components/container/HomeContainer/types";

const CREATE_INSTITUTION = gql`
  mutation CreateInstitution(
    $name: String!
    $reference: String!
    $expirationDate: Date!
  ) {
    createInstitution(
      data: {
        reference: $reference
        name: $name
        expirationDate: $expirationDate
      }
    ) {
      reference
    }
  }
`;

const UPDATE_INSTITUTION_SHOPPING = gql`
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

export const createInstitution = async (institution: InstitutionType) => {
  const { createInstitution } = await hygraph.request(
    CREATE_INSTITUTION,
    institution
  );

  return {
    ...createInstitution,
  };
};

export const updateInstitutionShopping = async (
  institutionReference: string,
  shoppingReference: string
) => {
  const { updateInstitution } = await hygraph.request(
    UPDATE_INSTITUTION_SHOPPING,
    {
      institutionReference,
      shoppingReference,
    }
  );

  return {
    ...updateInstitution,
  };
};
