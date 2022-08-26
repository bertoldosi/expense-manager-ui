export const formatMorney = (value: number | string) => {
  const valueFormat = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return valueFormat;
};
