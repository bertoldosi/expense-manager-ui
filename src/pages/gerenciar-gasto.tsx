import React from "react";

import { ManagerExpense } from "@components/ManagerExpense";
import { withAuth } from "@lib/authenticatedRoute";

const GerenciarGasto = () => {
  return <ManagerExpense />;
};

export const getServerSideProps = withAuth(async function () {
  return {
    props: {},
  };
});

export default GerenciarGasto;
