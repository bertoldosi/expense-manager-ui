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
`;

const GET_MONTH_NUMBER = gql`
  query GetMonthNumber($monthNumber: Int!) {
    month(where: { monthNumber: $monthNumber }) {
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
  const { updateMonth }: any = await hygraph
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
  const { months }: any = await hygraph.request(GET_MONTHS).catch((error) => {
    console.log(error);
  });

  return {
    ...months,
  };
};

export const getMonthNumber = async (monthNumber: Number) => {
  const { month }: any = await hygraph
    .request(GET_MONTH_NUMBER, {
      monthNumber,
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    ...month,
  };
};
