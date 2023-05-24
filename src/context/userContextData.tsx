import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import Cookies from "universal-cookie";

import { PersonType, UserType } from "@interfaces/*";
import { getPerson as getPersonApi } from "@api/person";

export type userContextDataType = {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
  person: PersonType | null;
  getPerson: Function;
  setPerson: Dispatch<SetStateAction<PersonType | null>>;
};

type PropsType = {
  children: ReactNode;
};

export const userContextData = createContext<userContextDataType | null>(null);

const UserAppContextProviderData = ({ children }: PropsType) => {
  const cookies = new Cookies();

  const [user, setUser] = useState<UserType | null>(null);
  const [person, setPerson] = useState<PersonType | null>(null);

  function getPerson(user: UserType) {
    getPersonApi(user.email).then((response) => {
      setPerson(response.data);
      setUser(user);
    });
  }

  useEffect(() => {
    if (user) {
      getPerson(user);
    } else {
      const { user } = cookies.get("expense-manager");
      getPerson(user);
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
      }}
    >
      {children}
    </userContextData.Provider>
  );
};

export default UserAppContextProviderData;
