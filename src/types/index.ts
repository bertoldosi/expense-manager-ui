export type ShoppingType = {
  reference: string;
  description: string;
  amount: string | number;
  responsible: string;
  isUpdate?: boolean;
  select?: boolean;
  paymentStatus: string;
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
  id: string;
  reference: string;
  name: string;
  amount: string | number;
  listResponsibleValues?: ResponsibleValuesType[] | undefined;
  expirationDate: string;
  shoppings: ShoppingType[];
  isShowShoppings?: boolean;
};

export type MonthType = {
  id: string;
  name: string;
  monthNumber: number;
  institutions: InstitutionType[];
};
