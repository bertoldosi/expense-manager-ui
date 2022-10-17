import React from "react";

import { Scontent, Sitem } from "./styles";
import { UserContext, UserContextType } from "src/context/userContext";

function Header() {
  const { months, nowMonth, setNowMonth } = React.useContext(
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
                setNowMonth(month.mesNumber);
              }}
            >
              <h1>{month.name}</h1>
            </Sitem>
          ) : (
            <Sitem
              key={index}
              onClick={() => {
                setNowMonth(month.mesNumber);
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
