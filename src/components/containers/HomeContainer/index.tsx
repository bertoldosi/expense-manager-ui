import React from "react";
import useMonth from "../../../hooks/useMonth";
import useTable from "../../../hooks/useTable";
import Header from "../../common/Header";
import { Content } from "../Content";

import { Scontainer } from "./styles";

function HomeContainer() {
  const { getMonths, months, nowMonth, setNowMonth } = useMonth();
  const {
    handlerShoppingsExpanded,
    monthList,
    setMonthList,
    responsibleTotalAmountList,
  } = useTable(months, nowMonth);

  React.useEffect(() => {
    getMonths();
  }, []);

  return (
    <Scontainer>
      <Header months={months} nowMonth={nowMonth} setNowMonth={setNowMonth} />

      {months.map(
        (monthMap) =>
          monthMap.mesNumber === nowMonth && (
            <Content
              setMonthList={setMonthList}
              monthList={monthList}
              month={monthMap}
              handlerShoppingsExpanded={handlerShoppingsExpanded}
            />
          )
      )}
    </Scontainer>
  );
}

export default HomeContainer;
