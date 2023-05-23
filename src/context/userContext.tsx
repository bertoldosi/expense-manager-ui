import React from "react";
import { darkTheme, lightTheme } from "src/styles/theme";
import { DefaultTheme } from "styled-components";

export type UserContextType = {
  nowMonth: number | undefined;
  nowCard: string | undefined;
  setNowMonth: Function;
  handlerNumberMonth: Function;
  handlerNameCard: Function;
  theme: DefaultTheme | any;
  toggleTheme: Function;
  isThemeDark: boolean;
};

type PropsType = {
  children: React.ReactNode;
};

export const UserContext = React.createContext<UserContextType | null>(null);

const UserContextProvider = ({ children }: PropsType) => {
  const [nowMonth, setNowMonth] = React.useState<number | undefined>();
  const [nowCard, setNowCard] = React.useState<string | undefined>();
  const [isThemeDark, setIsThemeDark] = React.useState<boolean>(false);

  const [theme, setTheme] = React.useState(() =>
    isThemeDark ? darkTheme : lightTheme
  );

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

  return (
    <UserContext.Provider
      value={{
        nowMonth,
        setNowMonth,
        handlerNumberMonth,
        handlerNameCard,
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
