import React from "react";
import useMonth from "../../../hooks/useMonth";
import useTable from "../../../hooks/useTable";
import Header from "../../common/Header";
import { Content } from "../Content";

import { Scontainer } from "./styles";

function HomeContainer() {
  const { getMonths, months, nowMonth, setNowMonth } = useMonth();
  const { monthList, setMonthList, responsibleTotalAmountList } = useTable(
    months,
    nowMonth
  );

  React.useEffect(() => {
    getMonths();
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
            />
          )
      )}
    </Scontainer>
  );
}

export default HomeContainer;
