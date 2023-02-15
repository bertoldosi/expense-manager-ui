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

export type UserType = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
};
