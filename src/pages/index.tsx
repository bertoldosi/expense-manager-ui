import Head from "next/head";
import * as React from "react";

import HomeContainer from "../components/containers/HomeContainer";

const Home = () => {
  return (
    <>
      <Head>
        <title>Expense Manager</title>
      </Head>
      <HomeContainer />
    </>
  );
};

export default Home;
