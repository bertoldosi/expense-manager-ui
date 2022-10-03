import React from "react";

import { hygraph } from "@services/HygraphClient";
import { MonthType } from "@containers/Home/types";
import { GET_MONTHS } from "@graphqls/month";

const useMonth = () => {
  const [nowMonth, setNowMonth] = React.useState<number>(
    () => new Date().getMonth() + 1
  );
  const [months, setMonths] = React.useState<MonthType[]>([]);

  const getMonths = async () => {
    const { months } = (await hygraph.request(GET_MONTHS)) || [];
    setMonths(months);
  };

  React.useEffect(() => {
    getMonths();
  }, [nowMonth]);

  return { nowMonth, months, setNowMonth, getMonths };
};

export default useMonth;
