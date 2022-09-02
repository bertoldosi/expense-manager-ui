import React from "react";

type ShoppingType = {
  id: string;
  description: string;
  amount: string | number;
  responsible: string;
};

type ResponsibleAmountType = {
  name: string;
  amount: string;
};

type InstitutionType = {
  id: string;
  name: string;
  amount: string | number;
  responsibleAmount: ResponsibleAmountType[];
  expirationDate: string;
  showSubmenus?: boolean;
  shoppings: ShoppingType[];
};

export const addingResponsibleAmount = (institution: InstitutionType) => {
  const shoppings = institution.shoppings;

  let novoLista = [];
  let m = new Map();

  for (let shopping of shoppings) {
    if (m.has(shopping.responsible)) {
      novoLista[m.get(shopping.responsible)].amount += Number(shopping.amount);
    } else {
      m.set(
        shopping.responsible,
        novoLista.push({
          name: shopping.responsible,
          amount: Number(shopping.amount),
        }) - 1
      );
    }
  }

  return novoLista;
};
