import Dropdown from "@commons/Dropdown";
import { MonthType } from "@interfaces/*";
import React from "react";
import { UserContext, UserContextType } from "src/context/userContext";

import { Scontainer, Sitem } from "./styles";

export const DropdownMonth = () => {
  const { months, nowMonth, handlerNumberMonth } = React.useContext(
    UserContext
  ) as UserContextType;
  const [month, setMonth] = React.useState<MonthType>();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useMemo(() => {
    setMonth(months.find((monthFilter) => monthFilter.mesNumber === nowMonth));
  }, [months]);

  return (
    <Dropdown
      label={month?.name}
      position="left"
      isVisible={isVisible}
      setIsVisible={setIsVisible}
    >
      <Scontainer>
        {months.map((month, index) =>
          nowMonth === month.mesNumber ? (
            <Sitem key={index} className="selected">
              <span>{month.name}</span>
            </Sitem>
          ) : (
            <Sitem
              key={index}
              onClick={() => {
                handlerNumberMonth(month.mesNumber);
                setIsVisible((prevState) => !prevState);
              }}
            >
              <span>{month.name}</span>
            </Sitem>
          )
        )}
      </Scontainer>
    </Dropdown>
  );
};
