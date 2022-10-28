import * as React from "react";
import Head from "next/head";

import HomeContainer from "@containers/Home";

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
