export type UserType = {
  id?: string;
  email: string;
  name: string;
  expenses: ExpenseType[];
};

export type ExpenseType = {
  id: string;
  name: string;
  totalAmount?: number;
  categoryTotals?: CategoryType[];
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
  institutionId?: string;
};

export type CategoryType = {
  category: string;
  total: number;
};

export type CategoryTotalsMonthType = {
  date: string;
  categoryTotals: CategoryType[];
};

export type TotalAmountType = {
  date: string;
  total: number;
};
