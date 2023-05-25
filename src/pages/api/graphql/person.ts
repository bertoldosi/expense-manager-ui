import { gql } from "@services/HygraphClient";

export const GET_PERSON = gql`
  query Person($email: String!) {
    person(where: { email: $email }) {
      name
      email
      expenses(first: 5000) {
        id
        name
        institutions(first: 5000) {
          id
          name
          amount
          shoppings(first: 5000, orderBy: createdAt_DESC) {
            id
            description
            amount
            responsible
            createdAt
          }
        }
      }
    }
  }
`;

export const GET_PERSONS = gql``;

export const CREATE_PERSON = gql`
  mutation CreatePerson($name: String!, $email: String!) {
    createPerson(data: { name: $name, email: $email }) {
      name
      email
      expenses(first: 5000) {
        id
        name
        institutions(first: 5000) {
          id
          name
          amount
          shoppings(first: 5000, orderBy: createdAt_DESC) {
            id
            description
            amount
            responsible
            createdAt
          }
        }
      }
    }
  }
`;
