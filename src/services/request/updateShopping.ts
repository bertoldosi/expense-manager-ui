import { ShoppingType } from "../../components/container/HomeContainer/types";
import { gql, hygraph } from "../HygraphClient";

const UPDATE_SHOPPING = gql`
  mutation UpdateShopping(
    $id: ID!
    $description: String!
    $amount: String!
    $responsible: String!
  ) {
    updateShopping(
      data: {
        description: $description
        amount: $amount
        responsible: $responsible
      }
      where: { id: $id }
    ) {
      id
    }
  }
`;

const PUBLISH_SHOPPING = gql`
  mutation PublishShopping($shoppingId: ID!) {
    publishShopping(where: { id: $shoppingId }, to: PUBLISHED) {
      id
    }
  }
`;

export const updateShopping = async (shoppingUpdate: ShoppingType) => {
  const { updateShopping } = await hygraph.request(UPDATE_SHOPPING, {
    ...shoppingUpdate,
  });

  hygraph.request(PUBLISH_SHOPPING, {
    shoppingId: updateShopping.id,
  });
};
