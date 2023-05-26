import React, { useState } from "react";
import { darkTheme } from "src/styles/theme";
import { DefaultTheme } from "styled-components";

export type UserContextConfigType = {
  toggleNameSelectedInstitution: FunctionStringCallback;
  nameSelectedInstitution: string | undefined;
  theme: DefaultTheme;
};

type PropsConfigType = {
  children: React.ReactNode;
};

export const UserContextConfig =
  React.createContext<UserContextConfigType | null>(null);

const UserContextConfigProvider = ({ children }: PropsConfigType) => {
  const [theme, _setTheme] = React.useState<DefaultTheme>(darkTheme);
  const [nameSelectedInstitution, setNameSelectedInstitution] =
    useState<string>();

  function toggleNameSelectedInstitution(value: string) {
    setNameSelectedInstitution(value);
    localStorage.setItem("@nameSelectedInstitution", value);
  }

  return (
    <UserContextConfig.Provider
      value={{
        toggleNameSelectedInstitution,
        nameSelectedInstitution,
        theme,
      }}
    >
      {children}
    </UserContextConfig.Provider>
  );
};

export default UserContextConfigProvider;
