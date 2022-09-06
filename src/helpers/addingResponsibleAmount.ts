import { InstitutionType } from "../components/container/HomeContainer/types";

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
