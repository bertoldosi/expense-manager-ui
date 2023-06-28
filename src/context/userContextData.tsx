import Cookies from "universal-cookie";

import React, { ReactNode, createContext, useState } from "react";

import { CookiesType, UserType } from "@interfaces/*";
import instances from "src/lib/axios-instance-internal";
import { useSession } from "next-auth/react";

interface SelectedInstitutionType {
  id: string;
  name: string;
}

export type userContextDataType = {
  user: UserType | null;
  getUser: Function;

  toggleSelectedInstitution: Function;
  selectedInstitution: SelectedInstitutionType | null;
};

type PropsType = {
  children: ReactNode;
};

export const userContextData = createContext<userContextDataType | null>(null);

const UserAppContextProviderData = ({ children }: PropsType) => {
  const cookies = new Cookies();

  const [user, setUser] = useState<UserType | null>(null);
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
          id: institution?.id,
          name: institution?.name,
        },
      },
    });
  }

  async function getUser(email: string) {
    await instances
      .get("/api/user", {
        params: {
          email: email,
        },
      })
      .then((response) => {
        return setUser(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <userContextData.Provider
      value={{
        user,
        getUser,

        toggleSelectedInstitution,
        selectedInstitution,
      }}
    >
      {children}
    </userContextData.Provider>
  );
};

export default UserAppContextProviderData;
