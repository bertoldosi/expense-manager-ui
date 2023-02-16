import React, { Dispatch, SetStateAction } from "react";
import { PersonType, UserType } from "@interfaces/*";
import { getPerson } from "@api/person";

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
  const [user, setUser] = React.useState<UserType>();
  const [person, setPerson] = React.useState<PersonType>();

  const getPersonHy = async (email: string) => {
    const response = await getPerson(email);

    setPerson(response.person);
  };

  React.useMemo(() => {
    if (user?.email) {
      getPersonHy(user.email);
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
