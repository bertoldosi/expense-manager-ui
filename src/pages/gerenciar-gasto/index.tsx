import React from "react";
import { ManagerExpense } from "@containers/ManagerExpense";
import { withAuth } from "src/lib/authenticatedRoute";

const GerenciarGasto = () => {
  return <ManagerExpense />;
};

export const getServerSideProps = withAuth(async function () {
  return {
    props: {},
  };
});

export default GerenciarGasto;
