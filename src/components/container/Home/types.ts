export type ShoppingType = {
  reference: string;
  description: string;
  amount: string | number;
  responsible: string;
  isUpdate?: boolean;
  repeat?: boolean;
  status_paid: string;
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
  reference: string;
  name: string;
  amount: string | number;
  listResponsibleValues: ResponsibleValuesType[];
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
