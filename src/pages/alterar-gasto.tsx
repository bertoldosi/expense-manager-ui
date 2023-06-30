import React from "react";

import { ChangeExpense } from "@components/ChangeExpense";
import { withAuth } from "@lib/authenticatedRoute";

const AlterarGasto = () => {
  return <ChangeExpense />;
};

export const getServerSideProps = withAuth(async function () {
  return {
    props: {},
  };
});

export default AlterarGasto;
