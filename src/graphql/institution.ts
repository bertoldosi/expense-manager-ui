import { hygraph, gql } from "../services/HygraphClient";

import { InstitutionType, ShoppingType } from "@containers/Home/types";

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
      name
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

const DELETE_INSTITUTION = gql`
  mutation DeleteInstitution($reference: String!) {
    deleteInstitution(where: { reference: $reference }) {
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
        reference: shopping.reference,
        description: shopping.description,
        amount: shopping.amount,
        responsible: shopping.responsible,
        status_paid: shopping.status_paid,
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
      reference: shopping.reference,
      description: shopping.description,
      amount: shopping.amount,
      responsible: shopping.responsible,
      status_paid: shopping.status_paid,
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

export const deleteInstitution = async (reference: string) => {
  const { deleteShopping } = await hygraph
    .request(DELETE_INSTITUTION, {
      reference,
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    ...deleteShopping,
  };
};
