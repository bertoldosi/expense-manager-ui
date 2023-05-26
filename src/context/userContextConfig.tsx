import { CookiesType, InstitutionType } from "@interfaces/*";
import React, { useEffect, useState } from "react";
import { darkTheme } from "src/styles/theme";
import { DefaultTheme } from "styled-components";
import Cookies from "universal-cookie";

interface SelectedInstitutionType {
  id: string;
  name: string;
}

export type UserContextConfigType = {
  toggleSelectedInstitution: Function;
  selectedInstitution: SelectedInstitutionType | null;
  theme: DefaultTheme;
};

type PropsConfigType = {
  children: React.ReactNode;
};

export const UserContextConfig =
  React.createContext<UserContextConfigType | null>(null);

const UserContextConfigProvider = ({ children }: PropsConfigType) => {
  const cookies = new Cookies();

  const [theme, _setTheme] = React.useState<DefaultTheme>(darkTheme);
  const [selectedInstitution, setSelectedInstitution] =
    useState<SelectedInstitutionType | null>(null);

  function toggleSelectedInstitution(institution: SelectedInstitutionType) {
    const cookieValues = cookies.get<CookiesType>("expense-manager");

    setSelectedInstitution(institution);

    cookies.set("expense-manager", {
      ...cookieValues,
      filter: {
        ...cookieValues.filter,
        institution: {
          id: institution.id,
          name: institution.name,
        },
      },
    });
  }

  useEffect(() => {
    const cookieValues = cookies.get<CookiesType>("expense-manager");

    if (cookieValues?.filter.institution.name) {
      toggleSelectedInstitution(cookieValues?.filter.institution);
    }
  }, []);

  return (
    <UserContextConfig.Provider
      value={{
        toggleSelectedInstitution,
        selectedInstitution,
        theme,
      }}
    >
      {children}
    </UserContextConfig.Provider>
  );
};

export default UserContextConfigProvider;
