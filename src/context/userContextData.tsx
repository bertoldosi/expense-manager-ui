import React, { Dispatch, SetStateAction } from "react";
import Cookies from "universal-cookie";

import { ExpenseType, PersonType, UserType } from "@interfaces/*";
import { getPerson as getPersonApi } from "@api/person";
import { getExpense } from "@api/expense";

export type userContextDataType = {
  user: UserType | undefined;
  setUser: Dispatch<SetStateAction<UserType | undefined>>;
  person: PersonType | undefined;
  setPerson: React.Dispatch<React.SetStateAction<PersonType | undefined>>;
  expense: ExpenseType | undefined;
  getExpenseData: Function;
};

type PropsType = {
  children: React.ReactNode;
};

export const userContextData = React.createContext<userContextDataType | null>(
  null
);

const UserAppContextProviderData = ({ children }: PropsType) => {
  const cookies = new Cookies();

  const [user, setUser] = React.useState<UserType>();
  const [person, setPerson] = React.useState<PersonType>();
  const [expense, setExpense] = React.useState<ExpenseType>();

  async function getPerson(user: UserType) {
    const { data: responsePerson } = await getPersonApi(user.email);

    setPerson(responsePerson);
    setUser(user);
  }

  async function getExpenseData() {
    const { filter } = await cookies.get("expense-manager");
    const response = await getExpense(filter?.expense?.id);
    setExpense(response.data);
  }

  React.useMemo(() => {
    const dataCookies = cookies.get("expense-manager");

    if (user?.email) {
      getPerson(user);
      cookies.set("expense-manager", { ...dataCookies, user: user });
    } else {
      if (dataCookies) {
        getPerson(dataCookies.user);
      }
    }
  }, [user]);

  return (
    <userContextData.Provider
      value={{
        user,
        setUser,
        person,
        setPerson,
        expense,
        getExpenseData,
      }}
    >
      {children}
    </userContextData.Provider>
  );
};

export default UserAppContextProviderData;
