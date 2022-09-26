import React from "react";
import { Scontent, Sitem, Slist } from "./styles";

function Header({ list }: any) {
  return (
    <Scontent>
      <Slist>
        {list.map((item: any) => (
          <Sitem>
            <h1>{item}</h1>
          </Sitem>
        ))}
      </Slist>
    </Scontent>
  );
}

export default Header;
