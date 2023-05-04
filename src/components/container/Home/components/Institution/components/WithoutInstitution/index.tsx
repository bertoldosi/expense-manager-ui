import React from "react";

import { Scontainer } from "./styles";
import Nav from "../Nav";
import { Saside, Ssection } from "../../styles";
import { CardMenu } from "../CardMenu";
import { Button } from "@commons/Button";
import { UserContext, UserContextType } from "src/context/userContext";

export const WithoutInstitution = () => {
  const { theme } = React.useContext(UserContext) as UserContextType;

  return (
    <Scontainer>
      return (
      <div>
        <nav>
          <Nav institutions={[]} />
        </nav>

        <Ssection>
          <Saside>
            <CardMenu
              title={"SEM CARTÃO"}
              list={[]}
              background={theme.backgroundPrimary}
              isFooter={
                <>
                  <Button color="#fff" background="#1b66ff" width="100%">
                    Novo cartão
                  </Button>
                </>
              }
            />
          </Saside>
        </Ssection>
      </div>
      );
    </Scontainer>
  );
};
