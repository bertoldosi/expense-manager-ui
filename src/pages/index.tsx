import Head from "next/head";
import type { GetServerSideProps } from "next";
import { gql } from "@apollo/client";

import { client } from "../services/ApolloClient";
import HomeContainer from "../components/container/HomeContainer";
import { InstitutionType } from "../components/container/HomeContainer/types";

type PropsType = {
  institutions: InstitutionType[];
};

const Home = ({ institutions }: PropsType) => {
  return (
    <>
      <Head>
        <title>Expense Manager</title>
      </Head>
      <HomeContainer institutions={institutions} />
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
