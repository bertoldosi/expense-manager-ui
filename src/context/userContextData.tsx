import Cookies from "universal-cookie";

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CookiesType,
  ExpenseType,
  InstitutionType,
  PersonType,
  UserType,
} from "@interfaces/*";
import { getPerson as getPersonApi } from "@api/person";
import { getExpense as getExpenseApi } from "@api/expense";
import { getInstitution as getInstitutionApi } from "@api/institution";

interface SelectedInstitutionType {
  id: string;
  name: string;
}

export type userContextDataType = {
  person: PersonType | null;
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
  getPerson: Function;
  setPerson: Dispatch<SetStateAction<PersonType | null>>;
  getExpense: Function;
  expense: ExpenseType | null;
  setExpense: Dispatch<SetStateAction<ExpenseType | null>>;
  getInstitution: Function;
  setInstitution: Dispatch<SetStateAction<InstitutionType | null>>;
  institution: InstitutionType | null;
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
  const [person, setPerson] = useState<PersonType | null>(null);
  const [expense, setExpense] = useState<ExpenseType | null>(null);
  const [institution, setInstitution] = useState<InstitutionType | null>(null);
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

  async function getPerson(user: UserType) {
    await getPersonApi(user.email)
      .then((response) => {
        return setPerson(response.data);
      })
      .catch((error) => console.log(error));
  }

  async function getExpense(id: string) {
    getExpenseApi(id)
      .then((response) => {
        setExpense(response.data);
      })
      .catch((error) => console.log(error));
  }

  async function getInstitution(id: string) {
    getInstitutionApi(id)
      .then((response) => {
        setInstitution(response.data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    const cookieValues = cookies.get<CookiesType>("expense-manager");

    if (cookieValues?.user) {
      getPerson(cookieValues?.user);
    }

    if (cookieValues?.filter?.institution) {
      getInstitution(cookieValues.filter.institution.id);
      toggleSelectedInstitution(cookieValues?.filter.institution);
    }
  }, []);

  useMemo(() => {
    const cookieValues = cookies.get<CookiesType>("expense-manager");

    if (cookieValues?.filter?.institution) {
      getInstitution(cookieValues.filter.institution.id);
    }
  }, [selectedInstitution]);

  return (
    <userContextData.Provider
      value={{
        user,
        setUser,
        person,
        getPerson,
        setPerson,
        expense,
        setExpense,
        getExpense,
        setInstitution,
        institution,
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
