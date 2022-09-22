import React from "react";
import { MonthType } from "../components/container/HomeContainer/types";
import { hygraph, gql } from "../services/HygraphClient";

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

const useMonth = () => {
  const [nowMonth, setNowMonth] = React.useState<number>(
    () => new Date().getMonth() + 1
  );
  const [months, setMonths] = React.useState<MonthType[]>([]);

  const getMonths = async () => {
    const { months } = (await hygraph.request(GET_MONTHS)) || [];
    setMonths(months);
  };

  React.useEffect(() => {
    getMonths();
  }, [nowMonth]);

  return { nowMonth, months, setNowMonth, getMonths };
};

export default useMonth;
