import Head from "next/head";
import type { GetServerSideProps } from "next";
import { gql } from "@apollo/client";
import list from "./tableItems";

import { client } from "../services/ApolloClient";
import HomeContainer from "../components/container/HomeContainer";
import { InstitutionType } from "../components/container/HomeContainer/types";
import Header from "../components/container/HomeContainer/components/Header";
import React from "react";

type PropsType = {
  institutions: InstitutionType[];
};

const Home = ({ institutions }: PropsType) => {
  const [nowMonth, setNowMonth] = React.useState<string>("Fev");

  return (
    <>
      <Head>
        <title>Expense Manager</title>
      </Head>

      <main>
        <Header
          nowMonth={nowMonth}
          setNowMonth={setNowMonth}
          monthList={list}
        />

        {list.map(
          (month, index) =>
            month.name === nowMonth && (
              <HomeContainer key={index} institutions={month.institutions} />
            )
        )}
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await client.query({
    query: gql`
      query MyQuery {
        institutions {
          id
          name
          amount
          expirationDate
          shoppings {
            id
            description
            amount
            responsible
          }
        }
      }
    `,
  });

  return { props: { institutions: data.institutions } };
};

export default Home;
