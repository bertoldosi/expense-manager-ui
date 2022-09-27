function maskCurrency(value: any, locale = "pt-BR", currency = "BRL") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}

export const maskMorney = (value: string, name: string) => {
  if (name === "amount") {
    const onlyDigits = value
      .split("")
      .filter((s) => /\d/.test(s))
      .join("")
      .padStart(3, "0");
    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2);
    const valueFormat = maskCurrency(digitsFloat);

    return valueFormat.replace("R$", "").replace(/\s/g, "");
  }

  if (name === "responsible") {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
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
