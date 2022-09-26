import React from "react";
import { Scontent, Sitem } from "./styles";

function Header({ list }: any) {
  return (
    <Scontent>
      <div>
        {list.map((item: any, index: any) => (
          <Sitem>
            <h1 key={index}>{item}</h1>
          </Sitem>
        ))}
      </div>
    </Scontent>
  );
}

export default Header;
