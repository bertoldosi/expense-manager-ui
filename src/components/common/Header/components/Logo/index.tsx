import React from "react";
import Image from "next/image";
import logoDark from "@assets/logo-dark.svg";

import { Scontainer } from "./styles";

export const Logo = () => {
  return (
    <Scontainer href="/">
      <Image src={logoDark} width={120} />
    </Scontainer>
  );
};
