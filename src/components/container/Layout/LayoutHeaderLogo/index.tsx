import React, { ForwardedRef, forwardRef } from "react";
import Image from "next/image";
import logoDark from "@assets/logo-dark.svg";

import { Scontainer } from "./styles";
import Link from "next/link";

interface LayoutHeaderLogoProps {}

const LayoutHeaderLogo = forwardRef<HTMLAnchorElement, LayoutHeaderLogoProps>(
  (props, ref) => {
    return (
      <Scontainer>
        <Link href="/" passHref ref={ref as ForwardedRef<HTMLAnchorElement>}>
          <a>
            <Image src={logoDark} width={120} />
          </a>
        </Link>
      </Scontainer>
    );
  }
);

export default LayoutHeaderLogo;
