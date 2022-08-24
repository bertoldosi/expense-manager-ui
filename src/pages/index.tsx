import type { NextPage } from "next";
import Head from "next/head";
import { HomeContainer } from "../components/container/Home";

const Home: NextPage = () => {
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
