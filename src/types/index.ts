export type UserType = {
  id?: string;
  email: string;
  name: string;
  expenses: ExpenseType[];
};

export type ExpenseType = {
  id: string;
  name: string;
  institutions?: InstitutionType[];
};

export type InstitutionType = {
  id: string;
  name: string;
  amount?: string | null;
  totalAmount?: number;
  categoryTotals?: CategoryType[];
  shoppings?: ShoppingType[] | null;
};

export type ShoppingType = {
  id: string;
  description: string;
  amount: string;
  category: string;
  paymentStatus: string;
  selected?: boolean;
};

export type CategoryType = {
  category: string;
  total: string;
};
