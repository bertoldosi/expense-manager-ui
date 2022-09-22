import { hygraph, gql } from "../services/HygraphClient";
import { v4 as uuidv4 } from "uuid";

import {
  InstitutionType,
  ShoppingType,
} from "../components/container/HomeContainer/types";

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

const CREATE_INSTITUTION_SHOPPINGS = gql`
  mutation CreateInstitution(
    $name: String!
    $reference: String!
    $expirationDate: Date!
    $shoppings: [ShoppingCreateInput!]
  ) {
    createInstitution(
      data: {
        reference: $reference
        name: $name
        expirationDate: $expirationDate
        shoppings: { create: $shoppings }
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

const UPDATE_INSTITUTION_SHOPPINGS = gql`
  mutation UpdateInstitutionShoppings(
    $institutionReference: String!
    $shoppings: [ShoppingCreateInput!]
  ) {
    updateInstitution(
      data: { shoppings: { create: $shoppings } }
      where: { reference: $institutionReference }
    ) {
      reference
    }
  }
`;

export const createInstitution = async (institution: InstitutionType) => {
  const { createInstitution } = await hygraph
    .request(CREATE_INSTITUTION, institution)
    .catch((error) => {
      console.log(error);
    });

  return {
    ...createInstitution,
  };
};

export const createInstitutionShoppings = async (
  institution: InstitutionType
) => {
  const { createInstitution } = await hygraph
    .request(CREATE_INSTITUTION_SHOPPINGS, {
      ...institution,
      shoppings: institution.shoppings.map((shopping) => ({
        reference: uuidv4(),
        description: shopping.description,
        amount: shopping.amount,
        responsible: shopping.responsible,
        repeat: false,
      })),
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    ...createInstitution,
  };
};

export const updateInstitutionShopping = async (
  institutionReference: string,
  shoppingReference: string
) => {
  const { updateInstitution } = await hygraph
    .request(UPDATE_INSTITUTION_SHOPPING, {
      institutionReference,
      shoppingReference,
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    ...updateInstitution,
  };
};

export const updateInstitutionShoppings = async (
  institutionReference: string,
  shoppings: ShoppingType[]
) => {
  const newShoppings = shoppings.map((shopping) => {
    return {
      reference: uuidv4(),
      description: shopping.description,
      amount: shopping.amount,
      responsible: shopping.responsible,
      repeat: false,
    };
  });

  const { updateInstitution } = await hygraph
    .request(UPDATE_INSTITUTION_SHOPPINGS, {
      institutionReference,
      shoppings: newShoppings,
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    ...updateInstitution,
  };
};
