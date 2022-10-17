import React from "react";

import { Scontent, Sitem } from "./styles";
import { UserContext, UserContextType } from "src/context/userContext";

function Header() {
  const { months, nowMonth, handlerNumberMonth } = React.useContext(
    UserContext
  ) as UserContextType;

  return (
    <Scontent>
      <div>
        {months.map((month, index) =>
          nowMonth === month.mesNumber ? (
            <Sitem
              key={index}
              className="selected"
              onClick={() => {
                handlerNumberMonth(month.mesNumber);
              }}
            >
              <h1>{month.name}</h1>
            </Sitem>
          ) : (
            <Sitem
              key={index}
              onClick={() => {
                handlerNumberMonth(month.mesNumber);
              }}
            >
              <h1>{month.name}</h1>
            </Sitem>
          )
        )}
      </div>
    </Scontent>
  );
}

export default Header;
