import { gql } from "graphql-request";
import instances from "src/lib/axios-instance";

export const getMoths = async () => {
  try {
    const requestBody = {
      query: gql`
        query {
          months(orderBy: monthNumber_ASC, first: 12) {
            id
            name
            monthNumber
            institutions {
              reference
              name
              amount
              expirationDate
              shoppings(first: 5000, orderBy: createdAt_DESC) {
                reference
                description
                amount
                responsible
                paymentStatus
              }
            }
          }
        }
      `,
    };

    const response = await instances.post("", requestBody);
    const { data } = response.data;

    return data;
  } catch (err) {
    console.log("ERROR AXIOS REQUEST", err);
    return err;
  }
};
