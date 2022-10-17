import * as React from "react";
import { MonthType, ResponsibleValuesType } from "@containers/Home/types";
import { GET_MONTHS } from "@graphqls/month";
import { hygraph } from "@services/HygraphClient";
import { sumAmountResponsible } from "@helpers/sumAmountResponsible";
import { updateAmountShoppings } from "@helpers/updateAmountShoppings";
import { sumTotalResponsible } from "@helpers/sumTotalResponsible";

export type UserContextType = {
  nowMonth: number;
  months: MonthType[];
  setMonths: Function;
  setNowMonth: Function;
  getMonths: Function;
  responsibleTotalAmountList: ResponsibleValuesType[];
  setResponsibleTotalAmountList: Function;
};

type PropsType = {
  children: React.ReactNode;
};

export const UserContext = React.createContext<UserContextType | null>(null);

const UserContextProvider = ({ children }: PropsType) => {
  const [months, setMonths] = React.useState<MonthType[]>([]);
  const [nowMonth, setNowMonth] = React.useState<number>(
    () => new Date().getMonth() + 1
  );
  const [responsibleTotalAmountList, setResponsibleTotalAmountList] =
    React.useState<ResponsibleValuesType[]>([]);

  const getMonths = async () => {
    const { months: monthsResponse } =
      (await hygraph.request(GET_MONTHS)) || [];

    setMonths(
      monthsResponse.map((month: MonthType) => {
        return {
          ...month,
          institutions: month.institutions.map((institution) => {
            return {
              ...institution,
              listResponsibleValues: sumAmountResponsible(institution),
              amount: updateAmountShoppings(institution.shoppings),
              isShowShoppings: false,
              shoppings: institution.shoppings.map((shopping) => {
                return {
                  ...shopping,
                  isUpdate: false,
                  select: false,
                };
              }),
            };
          }),
        };
      })
    );
  };

  React.useEffect(() => {
    months.map((monthMap) => {
      if (monthMap.mesNumber === nowMonth) {
        setResponsibleTotalAmountList(
          sumTotalResponsible([...monthMap.institutions])
        );
      }
    });
  }, [months]);

  React.useEffect(() => {
    getMonths();
  }, [nowMonth]);

  return (
    <UserContext.Provider
      value={{
        nowMonth,
        setNowMonth,
        months,
        setMonths,
        getMonths,
        responsibleTotalAmountList,
        setResponsibleTotalAmountList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
