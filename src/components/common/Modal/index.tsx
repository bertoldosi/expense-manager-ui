import React from "react";
import { Exit } from "../../icons/Exit";
import { Save } from "../../icons/Save";
import { Button } from "../Button";

import { Scontent, Sfooter, Sheader, Ssection, Swrapper } from "./styles";

export const Modal = ({
  children,
  title = "Novo cartão",
  isVisible = false,
  handlerIsVisible,
}: any) => {
  return (
    isVisible && (
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
          <Sfooter>
            <Button
              color="#fff"
              background="#B0C4DE"
              icon={<Save width={15} height={15} />}
            >
              Salvar
            </Button>
          </Sfooter>
        </Scontent>
      </Swrapper>
    )
  );
};
