import Image from "next/image";
import React, { ReactNode } from "react";
import logoDark from "@assets/logo-dark.svg";

import { Sbody, Scontainer, Scontent, Sfooter, Sheader } from "./styles";

type PropsType = {
  children: ReactNode;
  footer: ReactNode;
};

export const LayoutAccess = ({ children, footer }: PropsType) => {
  return (
    <Scontainer>
      <Scontent>
        <Sheader>
          <Image src={logoDark} width={150} />
        </Sheader>
        <Sbody>{children}</Sbody>
        <Sfooter>{footer}</Sfooter>
      </Scontent>
    </Scontainer>
  );
};
