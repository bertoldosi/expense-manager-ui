import React from "react";
import { darkTheme, lightTheme } from "src/styles/theme";
import { DefaultTheme } from "styled-components";

interface ThemeType {
  type: string;
  theme: DefaultTheme;
}

export type UserContextConfigType = {
  theme: ThemeType;
  toggleTheme: (type: string) => void;
};

type PropsConfigType = {
  children: React.ReactNode;
};

export const UserContextConfig =
  React.createContext<UserContextConfigType | null>(null);

const UserContextConfigProvider = ({ children }: PropsConfigType) => {
  const [theme, setTheme] = React.useState<ThemeType>({
    type: "dark",
    theme: darkTheme,
  });

  function toggleTheme(type: string) {
    if (type === "dark") {
      setTheme({
        type: "dark",
        theme: darkTheme,
      });
    } else {
      setTheme({
        type: "light",
        theme: lightTheme,
      });
    }
  }

  return (
    <UserContextConfig.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </UserContextConfig.Provider>
  );
};

export default UserContextConfigProvider;
