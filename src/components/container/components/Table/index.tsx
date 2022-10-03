import React from "react";
import { toast } from "react-toastify";

import { Save } from "@icons/Save";
import { Search } from "../Search";
import { Trash } from "@icons/Trash";
import { maskMorney } from "@helpers/masks";
import { deleteShopping } from "@graphqls/shopping";
import { SelectStatus } from "@commons/SelectStatus";
import InputTable from "@containers/components/InputTable";
import { removingShopping } from "@helpers/removingShopping";
import { subtractingValues } from "@helpers/subtractingValues";
import { updateShopping as upShopping } from "@graphqls/shopping";
import { sumAmountResponsible } from "@helpers/sumAmountResponsible";
import { updateAmountShoppings } from "@helpers/updateAmountShoppings";

import {
  InstitutionType,
  MonthType,
  ShoppingType,
} from "@containers/Home/types";

import { NoResult, Scontent } from "./styles";

type PropsType = {
  institution: InstitutionType;
  month: MonthType;
  monthList: MonthType[];
  setMonthList: Function;
  request: boolean;
  setRequest: Function;
};

export const Table = ({
  institution,
  month,
  monthList,
  setMonthList,
  request,
  setRequest,
}: PropsType) => {
  const [valueFilter, setValueFilter] = React.useState("todos");
  const [shoppings, setShoppings] = React.useState(institution.shoppings);

  const onChangeUpdateShopping = (
    event: React.ChangeEvent<HTMLInputElement>,
    institutionReference: string
  ) => {
    const { id, value, name } = event.target;

    setMonthList(
      monthList.map((monthMap) => {
        if (monthMap.id === month.id) {
          return {
            ...monthMap,
            institutions: monthMap.institutions.map((institutionMap) => {
              if (institutionMap.reference === institutionReference) {
                return {
                  ...institutionMap,
                  listResponsibleValues: sumAmountResponsible(institutionMap),
                  shoppings: institutionMap.shoppings.map((shoppingMap) => {
                    if (shoppingMap.reference === id) {
                      return {
                        ...shoppingMap,
                        [name]: maskMorney(value, name),
                        isUpdate: true,
                      };
                    } else {
                      return shoppingMap;
                    }
                  }),
                };
              } else {
                return institutionMap;
              }
            }),
          };
        } else {
          return monthMap;
        }
      })
    );
  };

  const onChangeUpdateRepeatShopping = (
    event: React.ChangeEvent<HTMLInputElement>,
    institutionReference: string
  ) => {
    const { id, checked, name } = event.target;

    setMonthList(
      monthList.map((monthMap) => {
        if (monthMap.id === month.id) {
          return {
            ...monthMap,
            institutions: monthMap.institutions.map((institutionMap) => {
              if (institutionMap.reference === institutionReference) {
                return {
                  ...institutionMap,
                  shoppings: institutionMap.shoppings.map((shoppingMap) => {
                    if (shoppingMap.reference === id) {
                      return {
                        ...shoppingMap,
                        [name]: checked,
                      };
                    } else {
                      return shoppingMap;
                    }
                  }),
                };
              } else {
                return institutionMap;
              }
            }),
          };
        } else {
          return monthMap;
        }
      })
    );
  };

  const removeShopping = async (
    institutionReference: string,
    shopping: ShoppingType
  ) => {
    toast.info(<h3>Processando...</h3>, {
      isLoading: true,
      toastId: "process",
    });

    setRequest(true);

    const shoppingReference = shopping.reference;

    deleteShopping(shoppingReference)
      .then(() => {
        setMonthList(
          monthList.map((monthMap) => {
            if (monthMap.id === month.id) {
              return {
                ...monthMap,
                institutions: monthMap.institutions.map((institutionMap) => {
                  if (institutionMap.reference === institutionReference) {
                    return {
                      ...institutionMap,
                      shoppings: removingShopping(
                        institutionMap.shoppings,
                        shoppingReference
                      ),
                      amount: subtractingValues(
                        institutionMap.amount,
                        shopping
                      ),
                    };
                  } else {
                    return institutionMap;
                  }
                }),
              };
            } else {
              return monthMap;
            }
          })
        );

        toast.update("process", {
          type: "success",
          isLoading: false,
          render: <h3>Deletado com sucesso!</h3>,
          autoClose: 2000,
        });
      })

      .catch(() => {
        toast.update("process", {
          type: "error",
          isLoading: false,
          render: <h3>Tente novamente!</h3>,
          autoClose: 2000,
        });
      })

      .finally(() => {
        setRequest(false);
      });
  };

  const updateShopping = async (
    institutionReference: string,
    shoppingUpdate: ShoppingType
  ) => {
    toast.info(<h3>Processando...</h3>, {
      isLoading: true,
      toastId: "process",
    });

    setRequest(true);
    const shoppingReference = shoppingUpdate.reference;

    upShopping(shoppingUpdate)
      .then(() => {
        setMonthList(
          monthList.map((monthMap) => {
            if (monthMap.id === month.id) {
              return {
                ...monthMap,
                institutions: monthMap.institutions.map((institutionMap) => {
                  if (institutionMap.reference === institutionReference) {
                    return {
                      ...institutionMap,
                      listResponsibleValues:
                        sumAmountResponsible(institutionMap),
                      shoppings: institutionMap.shoppings.map((shoppingMap) => {
                        if (shoppingMap.reference === shoppingReference) {
                          return {
                            ...shoppingUpdate,
                            isUpdate: false,
                          };
                        } else {
                          return shoppingMap;
                        }
                      }),
                    };
                  } else {
                    return institutionMap;
                  }
                }),
              };
            } else {
              return monthMap;
            }
          })
        );

        toast.update("process", {
          type: "success",
          isLoading: false,
          render: <h3>Alterado com sucesso!</h3>,
          autoClose: 2000,
        });
      })

      .catch(() => {
        toast.update("process", {
          type: "error",
          isLoading: false,
          render: <h3>Tente novamente!</h3>,
          autoClose: 2000,
        });
      })

      .finally(() => {
        setRequest(false);
      });
  };

  const filter = () => {
    setShoppings(
      institution.shoppings.filter((shopping) => {
        if (shopping.responsible === valueFilter) {
          return shopping;
        } else if (valueFilter === "todos") {
          return shopping;
        }
      })
    );
  };

  React.useEffect(() => {
    setMonthList(
      monthList.map((monthMap) => {
        if (monthMap.id === month.id) {
          return {
            ...monthMap,
            institutions: monthMap.institutions.map((institutionMap) => {
              return {
                ...institutionMap,
                listResponsibleValues: sumAmountResponsible(institutionMap),
                amount: updateAmountShoppings(institutionMap.shoppings),
              };
            }),
          };
        } else {
          return monthMap;
        }
      })
    );

    setShoppings(institution.shoppings);
    filter();
  }, [institution.shoppings]);

  React.useEffect(() => {
    filter();
  }, [valueFilter]);

  return (
    <>
      <Search
        setValueFilter={setValueFilter}
        options={institution.listResponsibleValues}
      />

      <Scontent>
        {shoppings.length > 0 ? (
          shoppings.map((shopping, index) => (
            <span key={index}>
              <strong>
                <InputTable
                  type="checkbox"
                  disabled={request}
                  name="repeat"
                  id={shopping.reference}
                  checked={shopping.repeat}
                  onChange={(event) => {
                    onChangeUpdateRepeatShopping(event, institution.reference);
                  }}
                />
                <InputTable
                  disabled={request}
                  name="description"
                  id={shopping.reference}
                  value={shopping.description}
                  onKeyUp={() => {
                    updateShopping(institution.reference, shopping);
                  }}
                  onChange={(event) => {
                    onChangeUpdateShopping(event, institution.reference);
                  }}
                />
              </strong>
              <strong>
                <InputTable
                  disabled={request}
                  name="amount"
                  id={shopping.reference}
                  value={shopping.amount}
                  onKeyUp={() => {
                    updateShopping(institution.reference, shopping);
                  }}
                  onChange={(event) => {
                    onChangeUpdateShopping(event, institution.reference);
                  }}
                />
              </strong>
              <strong>
                <InputTable
                  disabled={request || valueFilter != "todos"}
                  name="responsible"
                  id={shopping.reference}
                  value={shopping.responsible}
                  onKeyUp={() => {
                    updateShopping(institution.reference, shopping);
                  }}
                  onChange={(event) => {
                    onChangeUpdateShopping(event, institution.reference);
                  }}
                />
              </strong>
              <strong>
                <SelectStatus
                  selectClassName={shopping.status_paid}
                  optionClassName={shopping.status_paid}
                  name="status_paid"
                  id={shopping.reference}
                  value={shopping.status_paid}
                  options={[{ name: "aberto" }, { name: "pago" }]}
                  onChange={(event: any) => {
                    onChangeUpdateShopping(event, institution.reference);
                  }}
                />

                {shopping.isUpdate ? (
                  <Save
                    width={20}
                    height={20}
                    disabled={request}
                    onClick={() => {
                      updateShopping(institution.reference, shopping);
                    }}
                  />
                ) : (
                  <Trash
                    width={20}
                    height={20}
                    disabled={request}
                    onClick={() => {
                      removeShopping(institution.reference, shopping);
                    }}
                  />
                )}
              </strong>
            </span>
          ))
        ) : (
          <NoResult>
            <span>Nenhum resultado encontrado!</span>
          </NoResult>
        )}
      </Scontent>
    </>
  );
};
