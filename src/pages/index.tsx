import type { NextPage } from "next";
import Head from "next/head";
import CardControl from "../components/container/CardControl";

import monthly_expenses from "./tableItems";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Expense Manager</title>
      </Head>
      <CardControl monthly_expenses={monthly_expenses} />
    </>
  );
};

export default Home;
