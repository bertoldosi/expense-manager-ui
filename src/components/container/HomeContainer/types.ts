export type ShoppingType = {
  id: string;
  description: string;
  amount: string | number;
  responsible: string;
};

export type ResponsibleAmountType = {
  name: string;
  amount: string | number;
};

export type InstitutionType = {
  id: string;
  name: string;
  amount: string | number;
  responsibleAmount: ResponsibleAmountType[];
  expirationDate: string;
  shoppings: ShoppingType[];
  showSubmenus?: boolean;
};
