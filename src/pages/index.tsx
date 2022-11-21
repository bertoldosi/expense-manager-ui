import React from "react";
import Head from "next/head";
import HomeContainer from "@containers/Home";

const Home = () => {
  return (
    <>
      <Head>
        <title>Expense Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeContainer />
    </>
  );
};

export default Home;
