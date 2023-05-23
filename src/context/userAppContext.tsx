import React, { Dispatch, SetStateAction } from "react";
import { ExpenseType, PersonType, UserType } from "@interfaces/*";
import { getPerson as getPersonApi } from "@api/person";
import Cookies from "universal-cookie";
import { getExpense } from "@api/expense";

export type UserAppContextType = {
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

export const UserAppContext = React.createContext<UserAppContextType | null>(
  null
);

const UserAppContextProvider = ({ children }: PropsType) => {
  const cookies = new Cookies();

  const [user, setUser] = React.useState<UserType>();
  const [person, setPerson] = React.useState<PersonType>();
  const [expense, setExpense] = React.useState<ExpenseType>();

  const getPerson = async (user: UserType) => {
    const { data: responsePerson } = await getPersonApi(user.email);

    setPerson(responsePerson);
    setUser(user);
  };

  const getExpenseData = async () => {
    const { filter } = await cookies.get("expense-manager");
    const response = await getExpense(filter?.expense?.id);
    setExpense(response.data);
  };

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
    <UserAppContext.Provider
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
    </UserAppContext.Provider>
  );
};

export default UserAppContextProvider;
