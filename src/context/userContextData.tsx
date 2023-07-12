import Cookies from "universal-cookie";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

import {
  ExpenseType,
  InstitutionType,
  ShoppingType,
  UserType,
} from "@interfaces/*";
import instances from "@lib/axios-instance-internal";

interface SelectedInstitutionType {
  id: string;
  name: string;
}

export type userContextDataType = {
  user: UserType | null;
  getUser: Function;

  expense: ExpenseType | null;
  setExpense: Function;
  getExpense: Function;

  institution: InstitutionType | null;
  setInstitution: Function;
  getInstitution: Function;

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
  const [expense, setExpense] = useState<ExpenseType | null>(null);
  const [institution, setInstitution] = useState<InstitutionType | null>(null);

  const [selectedInstitution, setSelectedInstitution] =
    useState<SelectedInstitutionType | null>(() => {
      const cookieValues = cookies.get("expense-manager");

      return cookieValues?.filter?.institution;
    });

  function toggleSelectedInstitution(institution: SelectedInstitutionType) {
    const cookieValues = cookies.get("expense-manager");

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

  function getUser(email: string) {
    instances
      .get("/api/user", {
        params: {
          email: email,
        },
      })
      .then((response) => {
        return setUser(response.data);
      });
  }

  function getExpense(id: string, institutionsCreateAt: string) {
    instances
      .get("api/expense", {
        params: {
          id: id,
          institutionsCreateAt: institutionsCreateAt,
        },
      })
      .then((response) => {
        return setExpense(response.data);
      });
  }

  function getInstitution(id: string) {
    instances
      .get("api/institution", {
        params: {
          id: id,
        },
      })
      .then((response) => {
        return setInstitution({
          ...response.data,
          shoppings: response.data.shoppings.map(
            (shoppingMap: ShoppingType) => {
              return {
                ...shoppingMap,
                selected: false,
              };
            }
          ),
        });
      });
  }

  return (
    <userContextData.Provider
      value={{
        user,
        getUser,

        expense,
        setExpense,
        getExpense,

        institution,
        setInstitution,
        getInstitution,

        toggleSelectedInstitution,
        selectedInstitution,
      }}
    >
      {children}
    </userContextData.Provider>
  );
};

export default UserAppContextProviderData;
