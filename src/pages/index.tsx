import * as React from "react";
import Head from "next/head";

import HomeContainer from "@containers/Home";
import UserContextProvider from "src/context/userContext";

const Home = () => {
  return (
    <UserContextProvider>
      <Head>
        <title>Expense Manager</title>
      </Head>
      <HomeContainer />
    </UserContextProvider>
  );
};

export default Home;
