import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { Exit } from "../../icons/Exit";

import { Scontent, Sfooter, Sheader, Ssection, Swrapper } from "./styles";

type PropsType = {
  children: ReactNode;
  title: string;
  isVisible: boolean;
  handlerIsVisible: Dispatch<SetStateAction<boolean>>;
  footer: ReactNode;
};

export const Modal = ({
  children,
  title,
  isVisible,
  handlerIsVisible,
  footer,
}: PropsType) => {
  return (
    <>
      {isVisible && (
        <Swrapper>
          <Scontent>
            <Sheader>
              <h1>{title}</h1>
              <Exit
                width={20}
                height={20}
                onClick={() => {
                  handlerIsVisible(!isVisible);
                }}
              />
            </Sheader>
            <Ssection>{children}</Ssection>
            <Sfooter>{footer}</Sfooter>
          </Scontent>
        </Swrapper>
      )}
    </>
  );
};
