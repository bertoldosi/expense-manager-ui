import { hygraph, gql } from "../HygraphClient";

const GET_SHOPPING = gql`
  query GetShooping($reference: String!) {
    shopping(where: { reference: $reference }) {
      reference
    }
  }
`;

export const getShopping = async (reference: string) => {
  const { shopping } = await hygraph.request(GET_SHOPPING, {
    reference,
  });

  return {
    ...shopping,
  };
};
