import React from "react";
import Head from "next/head";

import Login from "@containers/Login";
import { LayoutAccess } from "@commons/LayoutAccess";

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

Home.layout = LayoutAccess;

export default Home;
