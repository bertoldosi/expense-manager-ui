export type UserType = {
  id?: string;
  email: string;
  name: string;
  expenses: ExpenseType[];
};

export type ExpenseType = {
  id: string;
  name: string;
  institutions: InstitutionType[];
};

export type InstitutionType = {
  id: string;
  name: string;
  amount?: string | null;
  shoppings: ShoppingType[];
};

export type ShoppingType = {
  id: string;
  description: string;
  amount: string;
  responsible: string;
  paymentStatus: string;
};
