export type ShoppingType = {
  id?: string;
  description?: string;
  amount?: string | number;
  responsible?: string;
};

export type ResponsibleValuesType = {
  responsible: string;
  amount: string | number;
};

export type SelectValuType = {
  responsible?: string;
  name?: string;
};

export type InstitutionType = {
  id?: string;
  name?: string;
  amount?: string | number | null;
  shoppings?: ShoppingType[];
};

export type MonthType = {
  id: string;
  name: string;
  monthNumber: number;
  institutions: InstitutionType[];
};

export type UserType = {
  email: string;
  name: string;
};

export type ExpenseType = {
  id?: string;
  name?: string;
  institutions: InstitutionType[];
};

export type PersonType = {
  id?: string;
  name: string;
  expenses: ExpenseType[];
};

export type EmailType = {
  email: string;
};

export type NewExpenseType = {
  name: string;
  email?: string;
  persons: EmailType[];
};

export type CookiesType = {
  user: { email: string; name: string };
  filter: {
    expense: { id: string; name: string };
    institution: { id: string; name: string };
  };
};
