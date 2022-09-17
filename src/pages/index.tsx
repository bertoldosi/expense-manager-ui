import Head from "next/head";
import type { GetServerSideProps } from "next";

import { hygraph, gql } from "../services/HygraphClient";
import HomeContainer from "../components/container/HomeContainer";
import { MonthType } from "../components/container/HomeContainer/types";
import Header from "../components/container/HomeContainer/components/Header";
import React from "react";

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
        shoppings {
          reference
          description
          amount
          responsible
        }
      }
    }
  }
`;

const Home = () => {
  const [months, setMonths] = React.useState<MonthType[]>([]);

  const [nowMonth, setNowMonth] = React.useState<number>(
    () => new Date().getMonth() + 1
  );

  const getMonths = async () => {
    const { months } = (await hygraph.request(GET_MONTHS)) || [];
    setMonths(months);
  };

  React.useEffect(() => {
    getMonths();
  }, [nowMonth]);

  return (
    <>
      <Head>
        <title>Expense Manager</title>
      </Head>

      <main>
        <Header
          nowMonth={nowMonth}
          setNowMonth={setNowMonth}
          monthList={months}
        />

        {months.map(
          (month, index) =>
            month.mesNumber === nowMonth && (
              <HomeContainer key={index} month={month} />
            )
        )}
      </main>
    </>
  );
};

export default Home;
