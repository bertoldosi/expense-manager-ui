import { gql } from "graphql-request";
import instances from "src/lib/axios-instance";

export const getPerson = async (email: string) => {
  try {
    const requestBody = {
      query: gql`
        query Person($email: String!) {
          person(where: { email: $email }) {
            id
            name
            expenses {
              id
              name
              institutions {
                id
                name
                shoppings {
                  id
                  description
                }
              }
            }
          }
        }
      `,
      variables: {
        email,
      },
    };

    const response = await instances.post("", requestBody);
    const { data } = response.data;

    return data;
  } catch (err) {
    console.log("ERROR AXIOS REQUEST", err);
    return err;
  }
};
