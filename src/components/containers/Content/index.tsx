import React from "react";
import { Expenses } from "../Expenses";
import { CardMenu } from "../../common/CardMenu";
import Nav from "../../common/Nav";

import { Sarticle, Saside, Ssection, Swrapper } from "./styles";
import { Modal } from "../../common/Modal";
import Input from "../../common/Input";

export const Content = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <Swrapper>
      <nav>
        <Nav list={["DEBITO", "NUBANK", "INTER", "BRADESCO", "SANTANDER"]} />
      </nav>

      <Ssection>
        <Saside>
          <CardMenu />
          <CardMenu
            isFooter={true}
            setIsVisible={setIsVisible}
            isVisible={isVisible}
          />
        </Saside>
        <Sarticle>
          <Expenses />
        </Sarticle>
        <Modal isVisible={isVisible} handlerIsVisible={setIsVisible}>
          <Input name="teste" value="" id="2" />
          <Input name="teste" value="" id="2" />
          <Input name="teste" value="" id="2" />
        </Modal>
      </Ssection>
    </Swrapper>
  );
};
