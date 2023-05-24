import React from "react";
import { Institution } from "@containers/Home/components/Institution";

import { Scontainer } from "./styles";
import {
  userContextData,
  userContextDataType,
} from "src/context/userContextData";

function Home() {
  const {} = React.useContext(userContextData) as userContextDataType;

  return (
    <Scontainer>
      <Institution institutions={[]} />
    </Scontainer>
  );
}

export default Home;
