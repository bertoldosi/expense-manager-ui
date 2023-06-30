import React from "react";
import Image from "next/image";
import logoDark from "@assets/logo-dark.svg";

import { Scontainer } from "./styles";
import Link from "next/link";

export const Logo = () => {
  return (
    <Scontainer>
      <Link href="/">
        <Image src={logoDark} width={120} />
      </Link>
    </Scontainer>
  );
};
