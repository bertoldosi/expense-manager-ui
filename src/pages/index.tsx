import React from "react";
import Head from "next/head";

import { Login } from "@containers/Login";

const Home = () => {
  return (
    <>
      <Head>
        <title>Expense Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </>
  );
};

export default Home;
