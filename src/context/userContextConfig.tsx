import React, { useState } from "react";
import { darkTheme, lightTheme } from "src/styles/theme";
// import { DefaultTheme } from "styled-components";

export type UserContextConfigType = {
  nameSelectedInstitution: string | undefined;
  toggleNameSelectedInstitution: Function;
  theme: any;
  toggleTheme: Function;
  isThemeDark: boolean;
};

type PropsConfigType = {
  children: React.ReactNode;
};

export const UserContextConfig =
  React.createContext<UserContextConfigType | null>(null);

const UserContextConfigProvider = ({ children }: PropsConfigType) => {
  const [isThemeDark, setIsThemeDark] = React.useState<boolean>(false);
  const [nameSelectedInstitution, setNameSelectedInstitution] =
    useState<string>();

  const [theme, setTheme] = React.useState(() =>
    isThemeDark ? darkTheme : lightTheme
  );

  const toggleNameSelectedInstitution = (value: string) => {
    setNameSelectedInstitution(value);
    localStorage.setItem("@nameCard", value);
  };

  const toggleTheme = () => {
    setIsThemeDark((prevIsThemeDark) => !prevIsThemeDark);
    localStorage.setItem("@expManTheme", String(!isThemeDark));
  };

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
    <UserContextConfig.Provider
      value={{
        toggleNameSelectedInstitution,
        nameSelectedInstitution,
        theme,
        toggleTheme,
        isThemeDark,
      }}
    >
      {children}
    </UserContextConfig.Provider>
  );
};

export default UserContextConfigProvider;
