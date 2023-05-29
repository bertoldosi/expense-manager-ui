import React from "react";
import { darkTheme } from "src/styles/theme";
import { DefaultTheme } from "styled-components";

export type UserContextConfigType = {
  theme: DefaultTheme;
};

type PropsConfigType = {
  children: React.ReactNode;
};

export const UserContextConfig =
  React.createContext<UserContextConfigType | null>(null);

const UserContextConfigProvider = ({ children }: PropsConfigType) => {
  const [theme, _setTheme] = React.useState<DefaultTheme>(darkTheme);

  return (
    <UserContextConfig.Provider
      value={{
        theme,
      }}
    >
      {children}
    </UserContextConfig.Provider>
  );
};

export default UserContextConfigProvider;
