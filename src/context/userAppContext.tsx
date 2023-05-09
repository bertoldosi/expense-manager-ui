import React, { Dispatch, SetStateAction } from "react";
import { PersonType, UserType } from "@interfaces/*";
import { getPerson } from "@api/person";
import Cookies from "universal-cookie";

export type UserAppContextType = {
  user: UserType | undefined;
  setUser: Dispatch<SetStateAction<UserType | undefined>>;
  person: PersonType | undefined;
  setPerson: React.Dispatch<React.SetStateAction<PersonType | undefined>>;
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

  const getPersonHy = async (user: UserType) => {
    const { data: responsePerson } = await getPerson(user.email);

    setPerson(responsePerson);
    setUser(user);
  };

  React.useMemo(() => {
    const dataCookies = cookies.get("expense-manager");

    if (user?.email) {
      getPersonHy(user);
      cookies.set("expense-manager", { ...dataCookies, user: user });
    } else {
      if (dataCookies) {
        getPersonHy(dataCookies.user);
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
      }}
    >
      {children}
    </UserAppContext.Provider>
  );
};

export default UserAppContextProvider;
