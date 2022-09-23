import Head from "next/head";

import { hygraph, gql } from "../services/HygraphClient";
import HomeContainer from "../components/container/HomeContainer";
import { MonthType } from "../components/container/HomeContainer/types";
import Header from "../components/container/HomeContainer/components/Header";
import React from "react";
import styled from "styled-components";
import useMonth from "../hooks/useMonth";

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

const Smain = styled.main`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
`;

const Home = () => {
  const { nowMonth, months, setNowMonth } = useMonth();

  return (
    <>
      <Head>
        <title>Expense Manager</title>
      </Head>

      <Smain>
        <Header
          nowMonth={nowMonth}
          setNowMonth={setNowMonth}
          monthList={months}
        />

        <HomeContainer nowMonth={nowMonth} setNowMonth={setNowMonth} />
      </Smain>
    </>
  );
};

export default Home;
