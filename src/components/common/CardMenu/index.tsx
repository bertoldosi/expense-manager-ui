import React from "react";
import { Button } from "../Button";
import { Add } from "../../icons/Add";
import { Repeat } from "../../icons/Repeat";

import { Scontent, Sfooter, Sheader, Ssection } from "./styles";

export const CardMenu = ({ isFooter, isVisible, setIsVisible }: any) => {
  return (
    <Scontent>
      <Sheader>
        <h1>TOTAL POR CARTÃO</h1>
      </Sheader>

      <Ssection>
        <span>
          <strong>MATHEUS</strong>
          <strong>R$ 250,00</strong>
        </span>

        <span>
          <strong>MATHEUS</strong>
          <strong>R$ 250,00</strong>
        </span>

        <span>
          <strong>MATHEUS</strong>
          <strong>R$ 250,00</strong>
        </span>

        <span>
          <strong>MATHEUS</strong>
          <strong>R$ 250,00</strong>
        </span>

        <span>
          <strong>MATHEUS</strong>
          <strong>R$ 250,00</strong>
        </span>
      </Ssection>
      {isFooter && (
        <Sfooter>
          <Button
            color="#fff"
            background="#B0C4DE"
            icon={<Repeat width={15} height={15} />}
          >
            Repetir compra
          </Button>
          <Button
            color="#fff"
            background="#B0C4DE"
            icon={<Add width={15} height={15} />}
            onClick={() => {
              setIsVisible(!isVisible);
            }}
          >
            Novo cartão
          </Button>
        </Sfooter>
      )}
    </Scontent>
  );
};
