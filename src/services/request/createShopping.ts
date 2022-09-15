import { hygraph } from "../HygraphClient";
import {} from "graphql";
import { ShoppingType } from "../../components/container/HomeContainer/types";

const CREATE_SHOPPING = `
    mutation CreateShopping($description: String!, $responsible: String!, $amount: String!) {
        createShopping(
        data: {description: $description, responsible: $responsible, amount: $amount}
        ) {
        id
        }
    }
`;

const PUBLISH_SHOPPING = `
    mutation PublishShopping($shoppingId: ID!) {
        publishShopping(where: {id: $shoppingId}, to: PUBLISHED) {
        id
        }
    }
`;

const UPDATE_INSTITUTION = `
    mutation UpdateInstitution($institutionId: ID!, $shoppingId: ID!) {
        updateInstitution(
        data: {shoppings: {connect: {where: {id: $shoppingId}}}}
        where: {id: $institutionId}
        ) {
        id
        }
    }
`;

const PUBLISH_INSTITUTION = `
    mutation PublishInstitution($institutionId: ID!) {
        publishInstitution(where: {id: $institutionId}, to: PUBLISHED) {
        id
        }
    }
`;

export const createShopping = async (
  institutionId: string,
  newBuy: ShoppingType
) => {
  const { createShopping } = await hygraph.request(CREATE_SHOPPING, {
    description: newBuy.description,
    responsible: newBuy.responsible,
    amount: newBuy.amount,
  });

  hygraph.request(PUBLISH_SHOPPING, {
    shoppingId: createShopping.id,
  });

  const { updateInstitution } = await hygraph.request(UPDATE_INSTITUTION, {
    institutionId,
    shoppingId: createShopping.id,
  });

  hygraph.request(PUBLISH_INSTITUTION, {
    institutionId: updateInstitution.id,
  });
};
