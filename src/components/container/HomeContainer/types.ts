export type ShoppingType = {
  id: string;
  description: string;
  amount: string | number;
  responsible: string;
  isUpdate?: boolean;
};

export type ResponsibleValuesType = {
  responsible: string;
  amount: string | number;
};

export type InstitutionType = {
  id: string;
  name: string;
  amount: string | number;
  listResponsibleValues?: ResponsibleValuesType[];
  expirationDate: string;
  shoppings: ShoppingType[];
  isShowShoppings?: boolean;
};

export type MonthType = {
  id: string;
  name: string;
  mesNumber: number;
  institutions: InstitutionType[];
};
