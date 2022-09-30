import { hygraph, gql } from "@services/HygraphClient";

const UPDATE_MONTH = gql`
  mutation UpdateMonth($institutionReference: String!, $monthId: ID!) {
    updateMonth(
      data: {
        institutions: {
          connect: { where: { reference: $institutionReference } }
        }
      }
      where: { id: $monthId }
    ) {
      id
    }
  }
`;

export const GET_MONTHS = gql`
  query {
    months(orderBy: mesNumber_ASC, first: 12) {
      id
      name
      mesNumber
      institutions {
        reference
        name
        amount
        expirationDate
        shoppings(first: 5000) {
          reference
          description
          amount
          responsible
        }
      }
    }
  }
`;

const GET_MONTH_NUMBER = gql`
  query GetMonthNumber($mesNumber: Int!) {
    month(where: { mesNumber: $mesNumber }) {
      id
      institutions {
        reference
        name
      }
    }
  }
`;

export const updateMonthInstitution = async (
  monthId: string,
  institutionReference: string
) => {
  const { updateMonth } = await hygraph
    .request(UPDATE_MONTH, {
      institutionReference,
      monthId,
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    ...updateMonth,
  };
};

export const getMonths = async () => {
  const { months } = await hygraph.request(GET_MONTHS).catch((error) => {
    console.log(error);
  });

  return {
    ...months,
  };
};

export const getMonthNumber = async (mesNumber: Number) => {
  const { month } = await hygraph
    .request(GET_MONTH_NUMBER, {
      mesNumber,
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    ...month,
  };
};
