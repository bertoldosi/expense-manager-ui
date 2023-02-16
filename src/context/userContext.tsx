import React, { Dispatch, SetStateAction } from "react";
import { sumResponsibleMonth } from "@helpers/sumResponsibleMonth";
import { darkTheme, lightTheme } from "src/styles/theme";
import { DefaultTheme } from "styled-components";
import {
  MonthType,
  PersonType,
  ResponsibleValuesType,
  UserType,
} from "@interfaces/*";
import { sumResponsibleYear } from "@helpers/sumResponsibleYear";
import { getPerson } from "@api/person";

export type UserContextType = {
  nowMonth: number | undefined;
  nowCard: string | undefined;
  months: MonthType[];
  setMonths: Function;
  setNowMonth: Function;
  getMonths: Function;
  listResponsibleTotalMonth: ResponsibleValuesType[];
  listResponsibleTotalYear: ResponsibleValuesType[];
  setListResponsibleTotalMonth: Function;
  handlerNumberMonth: Function;
  handlerNameCard: Function;
  theme: DefaultTheme | any;
  toggleTheme: Function;
  isThemeDark: boolean;
  user: UserType | undefined;
  setUser: Dispatch<SetStateAction<UserType | undefined>>;
  person: PersonType | undefined;
  setPerson: React.Dispatch<React.SetStateAction<PersonType | undefined>>;
};

type PropsType = {
  children: React.ReactNode;
};

export const UserContext = React.createContext<UserContextType | null>(null);

const UserContextProvider = ({ children }: PropsType) => {
  const [months, setMonths] = React.useState<MonthType[]>([]);
  const [nowMonth, setNowMonth] = React.useState<number | undefined>();
  const [nowCard, setNowCard] = React.useState<string | undefined>();
  const [isThemeDark, setIsThemeDark] = React.useState<boolean>(false);
  const [listResponsibleTotalMonth, setListResponsibleTotalMonth] =
    React.useState<ResponsibleValuesType[]>([]);
  const [listResponsibleTotalYear, setListResponsibleTotalYear] =
    React.useState<ResponsibleValuesType[]>([]);

  const [theme, setTheme] = React.useState(() =>
    isThemeDark ? darkTheme : lightTheme
  );
  const [user, setUser] = React.useState<UserType>();
  const [person, setPerson] = React.useState<PersonType>();

  const getMonths = async () => {
    setMonths([]);
    // const { months } = await getMoths();
    // setMonths(
    //   months.map((month: MonthType) => {
    //     return {
    //       ...month,
    //       institutions: month.institutions.map((institution) => {
    //         return {
    //           ...institution,
    //           listResponsibleValues: sumResponsibleCard(institution),
    //           listResponsibleValuesInitial: sumResponsibleCard(institution),
    //           amount: updateAmountShoppings(institution.shoppings),
    //           isShowShoppings: false,
    //           shoppings: institution.shoppings.map((shopping) => {
    //             return {
    //               ...shopping,
    //               isUpdate: false,
    //               select: false,
    //             };
    //           }),
    //         };
    //       }),
    //     };
    //   })
    // );
  };

  const getPersonHy = async (email: string) => {
    const response = await getPerson(email);

    setPerson(response.person);
  };

  const handlerNumberMonth = (value: number) => {
    setNowMonth(value);
    localStorage.setItem("@numberMonth", String(value));
  };

  const handlerNameCard = (value: string) => {
    setNowCard(value);
    localStorage.setItem("@nameCard", value);
  };

  const toggleTheme = () => {
    setIsThemeDark((prevIsThemeDark) => !prevIsThemeDark);
    localStorage.setItem("@expManTheme", String(!isThemeDark));
  };

  React.useEffect(() => {
    const numberMonth = new Date().getMonth() + 1;
    const numberMonthStorage = localStorage.getItem("@numberMonth");
    const numberCardStorage = localStorage.getItem("@nameCard");

    if (numberMonthStorage) {
      setNowMonth(Number(numberMonthStorage));
    } else {
      setNowMonth(numberMonth);
    }

    if (numberCardStorage) {
      setNowCard(numberCardStorage);
    } else {
      setNowCard("sem card");
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
      if (monthMap.monthNumber === nowMonth) {
        setListResponsibleTotalMonth(
          sumResponsibleMonth([...monthMap.institutions])
        );
      }
    });

    setListResponsibleTotalYear(sumResponsibleYear(months));
  }, [months]);

  React.useMemo(() => {
    getMonths();
  }, [nowMonth, nowCard]);

  React.useMemo(() => {
    if (user?.email) {
      getPersonHy(user.email);
    }
  }, [user]);
  return (
    <UserContext.Provider
      value={{
        nowMonth,
        setNowMonth,
        months,
        setMonths,
        getMonths,
        listResponsibleTotalMonth,
        setListResponsibleTotalMonth,
        listResponsibleTotalYear,
        handlerNumberMonth,
        handlerNameCard,
        nowCard,
        theme,
        toggleTheme,
        isThemeDark,
        user,
        setUser,
        person,
        setPerson,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
