import React from "react";
import CardControll from "../CardControl";
import monthly_expenses from "../../../pages/tableItems";

import { Container } from "./styles";

export const HomeContainer = () => {
  return (
    <Container>
      <CardControll monthly_expenses={monthly_expenses} />
    </Container>
  );
};
