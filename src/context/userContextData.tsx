import Cookies from "universal-cookie";

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

import { ExpenseType, PersonType, UserType } from "@interfaces/*";
import { getPerson as getPersonApi } from "@api/person";
import { getExpense as getExpenseApi } from "@api/expense";

export type userContextDataType = {
  person: PersonType | null;
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
  getPerson: Function;
  setPerson: Dispatch<SetStateAction<PersonType | null>>;
  getExpense: Function;
  expense: ExpenseType | null;
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

  async function getPerson(user: UserType) {
    await getPersonApi(user.email)
      .then((response) => setPerson(response.data))
      .catch((error) => console.log(error));
  }

  function getExpense(id: string) {
    getExpenseApi(id)
      .then((response) => {
        setExpense(response.data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    const cookieValues = cookies.get("expense-manager");

    if (cookieValues?.user) {
      getPerson(cookieValues?.user);
    }
  }, []);

  return (
    <userContextData.Provider
      value={{
        user,
        setUser,
        person,
        getPerson,
        setPerson,
        expense,
        getExpense,
      }}
    >
      {children}
    </userContextData.Provider>
  );
};

export default UserAppContextProviderData;
