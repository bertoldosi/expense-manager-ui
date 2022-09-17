import { hygraph, gql } from "../HygraphClient";

const DELETE_SHOPPING = gql`
  mutation DeleteShopping($reference: String!) {
    deleteShopping(where: { reference: $reference }) {
      reference
    }
  }
`;

export const deleteShopping = async (reference: string) => {
  hygraph.request(DELETE_SHOPPING, {
    reference,
  });
};
