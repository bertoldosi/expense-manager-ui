import React from "react";
import Head from "next/head";
import HomeContainer from "@containers/Home";
import { withAuth } from "src/lib/authenticatedRoute";

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

export const getServerSideProps = withAuth(async function ({ req, res }) {
  const isExpense = !req.cookies["expense-manager"];

  if (isExpense) {
    return {
      redirect: {
        destination: "/alterar-gasto",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
});

export default Home;
