import React from "react";

import useMonth from "@hooks/useMonth";
import useTable from "@hooks/useTable";
import Header from "@commons/Header";
import { Content } from "@containers/components/Content";

import { Scontainer } from "./styles";
import { UserContext, UserContextType } from "src/context/userContext";

function Home() {
  const { months: monthsContext } = React.useContext(
    UserContext
  ) as UserContextType;

  const { getMonths, months, nowMonth, setNowMonth } = useMonth();
  const { monthList, setMonthList, responsibleTotalAmountList } = useTable(
    months,
    nowMonth
  );

  React.useEffect(() => {
    getMonths();

    console.log(monthsContext);
  }, [nowMonth]);

  return (
    <Scontainer>
      <Header months={months} nowMonth={nowMonth} setNowMonth={setNowMonth} />

      {monthList.map(
        (monthMap, index) =>
          monthMap.mesNumber === nowMonth && (
            <Content
              key={index}
              setMonthList={setMonthList}
              monthList={monthList}
              month={monthMap}
              responsibleTotalAmountList={responsibleTotalAmountList}
              getMonths={getMonths}
            />
          )
      )}
    </Scontainer>
  );
}

export default Home;
