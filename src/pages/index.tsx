import Head from "next/head";
import * as React from "react";

import HomeContainer from "../components/container/HomeContainer";
import Header from "../components/container/HomeContainer/components/Header";
import styled from "styled-components";
import useMonth from "../hooks/useMonth";

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

        <HomeContainer nowMonth={nowMonth} months={months} />
      </Smain>
    </>
  );
};

export default Home;
