import { ShoppingType } from "../../components/container/HomeContainer/types";
import { gql, hygraph } from "../HygraphClient";

const UPDATE_SHOPPING = gql`
  mutation UpdateShopping(
    $reference: String!
    $description: String!
    $amount: String!
    $responsible: String!
  ) {
    updateShopping(
      data: {
        reference: $reference
        description: $description
        amount: $amount
        responsible: $responsible
      }
      where: { reference: $reference }
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

export const updateShopping = async (shoppingUpdate: ShoppingType) => {
  const { updateShopping } = await hygraph.request(UPDATE_SHOPPING, {
    ...shoppingUpdate,
  });

  hygraph.request(PUBLISH_SHOPPING, {
    shoppingReference: updateShopping.reference,
  });
};
