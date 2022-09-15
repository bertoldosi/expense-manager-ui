import Head from "next/head";
import type { GetServerSideProps } from "next";

import { hygraph } from "../services/HygraphClient";
import HomeContainer from "../components/container/HomeContainer";
import { MonthType } from "../components/container/HomeContainer/types";
import Header from "../components/container/HomeContainer/components/Header";
import React from "react";

type PropsType = {
  months: MonthType[];
};

const GET_MONTHS = `
  query {
    months(orderBy: mesNumber_ASC) {
      id
      name
      mesNumber
      institutions {
        id
        name
        amount
        expirationDate
        shoppings {
          id
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
