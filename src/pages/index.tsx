import type { NextPage } from "next";
import Head from "next/head";
import HomeContainer from "../components/container/HomeContainer";

import monthly_expenses from "./tableItems";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Expense Manager</title>
      </Head>
      <HomeContainer monthly_expenses={monthly_expenses} />
    </>
  );
};

export default Home;
