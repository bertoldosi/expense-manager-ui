import React from "react";
import { MonthType, ResponsibleValuesType } from "src/types/types";
import { GET_MONTHS } from "@graphqls/month";
import { hygraph } from "@services/HygraphClient";
import { sumAmountResponsible } from "@helpers/sumAmountResponsible";
import { updateAmountShoppings } from "@helpers/updateAmountShoppings";
import { sumTotalResponsible } from "@helpers/sumTotalResponsible";
import { darkTheme, lightTheme } from "src/styles/theme";
import { DefaultTheme } from "styled-components";

export type UserContextType = {
  nowMonth: number | undefined;
  nowCard: number | undefined;
  months: MonthType[];
  setMonths: Function;
  setNowMonth: Function;
  getMonths: Function;
  responsibleTotalAmountList: ResponsibleValuesType[];
  setResponsibleTotalAmountList: Function;
  handlerNumberMonth: Function;
  handlerNumberCard: Function;
  theme: DefaultTheme;
  toggleTheme: Function;
  isThemeDark: boolean;
};

type PropsType = {
  children: React.ReactNode;
};

export const UserContext = React.createContext<UserContextType | null>(null);

const UserContextProvider = ({ children }: PropsType) => {
  const [months, setMonths] = React.useState<MonthType[]>([]);
  const [nowMonth, setNowMonth] = React.useState<number | undefined>();
  const [nowCard, setNowCard] = React.useState<number | undefined>();
  const [isThemeDark, setIsThemeDark] = React.useState<boolean>(false);
  const [responsibleTotalAmountList, setResponsibleTotalAmountList] =
    React.useState<ResponsibleValuesType[]>([]);

  const [theme, setTheme] = React.useState(() =>
    isThemeDark ? darkTheme : lightTheme
  );

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

  const handlerNumberMonth = (value: number) => {
    setNowMonth(value);
    localStorage.setItem("@numberMonth", String(value));
  };

  const handlerNumberCard = (value: number) => {
    setNowCard(value);
    localStorage.setItem("@numberCard", String(value));
  };

  const toggleTheme = () => {
    setIsThemeDark((prevIsThemeDark) => !prevIsThemeDark);
    localStorage.setItem("@expManTheme", String(!isThemeDark));
  };

  React.useEffect(() => {
    const numberMonth = new Date().getMonth() + 1;
    const numberMonthStorage = localStorage.getItem("@numberMonth");
    const numberCardStorage = localStorage.getItem("@numberCard");

    if (numberMonthStorage) {
      setNowMonth(Number(numberMonthStorage));
    } else {
      setNowMonth(numberMonth);
    }

    if (numberCardStorage) {
      setNowCard(Number(numberCardStorage));
    } else {
      setNowCard(0);
    }
  }, []);

  React.useEffect(() => {
    const isDarkThemeStorageStrig = localStorage.getItem("@expManTheme");

    const isDarkThemeStorageBoolean = isDarkThemeStorageStrig === "true";

    if (isDarkThemeStorageStrig) {
      setIsThemeDark(isDarkThemeStorageBoolean);
    } else {
      setIsThemeDark(true);
    }
  }, []);

  React.useMemo(() => {
    const theme = isThemeDark ? darkTheme : lightTheme;

    setTheme(theme);
  }, [isThemeDark]);

  React.useMemo(() => {
    months.map((monthMap) => {
      if (monthMap.mesNumber === nowMonth) {
        setResponsibleTotalAmountList(
          sumTotalResponsible([...monthMap.institutions])
        );
      }
    });
  }, [months]);

  React.useMemo(() => {
    getMonths();
  }, [nowMonth, nowCard]);

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
        handlerNumberMonth,
        handlerNumberCard,
        nowCard,
        theme,
        toggleTheme,
        isThemeDark,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
