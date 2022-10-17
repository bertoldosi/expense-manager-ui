import * as React from "react";
import { MonthType } from "@containers/Home/types";
import { GET_MONTHS } from "@graphqls/month";
import { hygraph } from "@services/HygraphClient";

export type UserContextType = {
  nowMonth: Number;
  months: MonthType[];
  setNowMonth: Function;
  getMonths: Function;
};

type PropsType = {
  children: React.ReactNode;
};

export const UserContext = React.createContext<UserContextType | null>(null);

const UserContextProvider = ({ children }: PropsType) => {
  const [nowMonth, setNowMonth] = React.useState<number>(
    () => new Date().getMonth() + 1
  );
  const [months, setMonths] = React.useState<MonthType[]>([]);

  const getMonths = async () => {
    const { months } = (await hygraph.request(GET_MONTHS)) || [];
    setMonths(months);
  };

  React.useEffect(() => {
    getMonths();
  }, [nowMonth]);

  return (
    <UserContext.Provider value={{ nowMonth, months, setNowMonth, getMonths }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
