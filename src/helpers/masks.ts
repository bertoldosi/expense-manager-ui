export const maskMorney = (value: string, name: string) => {
  if (name === "amount") {
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");

    return value;
  }

  return value;
};

export const maskDate = (value: string, name: string) => {
  if (name === "expirationDate") {
    value = value.replace(/^(\d{3})(\d{3})(\d{4}).*/, "($1) $2-$3");

    return value;
  }

  return value;
};
