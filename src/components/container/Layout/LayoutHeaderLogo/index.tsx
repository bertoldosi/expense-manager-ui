import React from "react";
import Image from "next/image";
import logoDark from "@assets/logo-dark.svg";

import { Scontainer } from "./styles";
import Link from "next/link";

function HeaderLogo() {
  return (
    <Scontainer>
      <Link href="/">
        <Image src={logoDark} width={120} />
      </Link>
    </Scontainer>
  );
}

export default HeaderLogo;
