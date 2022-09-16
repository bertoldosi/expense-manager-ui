import { hygraph } from "../HygraphClient";

const DELETE_SHOPPING = `
    mutation DeleteShopping($id: ID!) {
        deleteShopping(where: {id: $id}) {
        id
        }
    }
  `;

export const deleteShopping = async (id: string) => {
  hygraph.request(DELETE_SHOPPING, {
    id,
  });
};
