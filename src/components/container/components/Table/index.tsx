import React from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

import { Save } from "@icons/Save";
import { HeaderTable } from "../HeaderTable";
import { maskMorney } from "@helpers/masks";
import { deleteShopping } from "@graphqls/shopping";
import { SelectStatus } from "@commons/SelectStatus";
import InputTable from "@containers/components/InputTable";
import { updateShopping as upShopping } from "@graphqls/shopping";
import { sumAmountResponsible } from "@helpers/sumAmountResponsible";
import { updateAmountShoppings } from "@helpers/updateAmountShoppings";
import { getMonthNumber, updateMonthInstitution } from "@graphqls/month";

import {
  InstitutionType,
  MonthType,
  ShoppingType,
} from "@containers/Home/types";

import {
  createInstitutionShoppings,
  updateInstitutionShoppings,
} from "@graphqls/institution";

import { NoResult, Scontent } from "./styles";

type PropsType = {
  institution: InstitutionType;
  month: MonthType;
  monthList: MonthType[];
  setMonthList: Function;
  request: boolean;
  setRequest: Function;
  getMonths: Function;
};

export const Table = ({
  institution,
  month,
  monthList,
  setMonthList,
  request,
  setRequest,
  getMonths,
}: PropsType) => {
  const [valueFilter, setValueFilter] = React.useState("todos");
  const [shoppings, setShoppings] = React.useState(institution.shoppings);
  const [isItensSelect, setIsItensSelect] = React.useState(false);
  const [isRequest, setIsRequest] = React.useState(false);

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

  const onChangeSelectOnly = (
    event: React.ChangeEvent<HTMLInputElement>,
    shopping: ShoppingType
  ) => {
    const { checked } = event.target;

    setShoppings(
      shoppings.map((shoppingMap) => {
        if (shoppingMap.reference === shopping.reference) {
          return {
            ...shoppingMap,
            select: checked,
          };
        } else {
          return shoppingMap;
        }
      })
    );
  };

  const onChangeSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    if (checked) {
      setShoppings(
        shoppings.map((shopping) => {
          return {
            ...shopping,
            select: true,
          };
        })
      );
    } else {
      setShoppings(
        shoppings.map((shopping) => {
          return {
            ...shopping,
            select: false,
          };
        })
      );
    }
  };

  const getNextMonth = async () => {
    const { id: monthIdNextMonth, institutions: institutionsNextMonth } =
      await getMonthNumber(month.mesNumber + 1).catch(() => {
        toast.error(<h3>Algo de errado aconteceu ao buscar próximo mês!</h3>);
      });

    return {
      monthIdNextMonth,
      institutionsNextMonth,
    };
  };

  const repeat = async () => {
    setIsRequest(true);
    const { monthIdNextMonth, institutionsNextMonth } = await getNextMonth();

    const nextInstitution = institutionsNextMonth.filter(
      (institutionMap: InstitutionType) =>
        institutionMap.name === institution.name
    );

    const isExistInstitutionNextMonth = nextInstitution.length > 0;

    const shoppingsRepeat = shoppings
      .filter((shopping) => shopping.select)
      .map((shopping) => {
        return {
          ...shopping,
          reference: uuidv4(),
          status_paid: "aberto",
          select: false,
        };
      });

    const institutionRepeat = {
      ...institution,
      reference: uuidv4(),
      shoppings: shoppingsRepeat,
    };

    if (isExistInstitutionNextMonth) {
      const institutionReference = nextInstitution[0].reference;

      updateInstitutionShoppings(institutionReference, shoppingsRepeat)
        .then(() => {
          setMonthList(
            monthList.map((monthMap) => {
              if (monthMap.id === monthIdNextMonth) {
                return {
                  ...monthMap,
                  institutions: monthMap.institutions.map((institutionMap) => {
                    if (institutionMap.reference === institutionReference) {
                      return {
                        ...institutionMap,
                        shoppings: [
                          ...institutionMap.shoppings,
                          [...shoppingsRepeat],
                        ],
                      };
                    } else {
                      return institutionMap;
                    }
                  }),
                };
              } else if (monthMap.id === month.id) {
                return {
                  ...monthMap,
                  institutions: monthMap.institutions.map((institutionMap) => {
                    return {
                      ...institutionMap,
                      shoppings: institutionMap.shoppings.map((shoppingMap) => {
                        return {
                          ...shoppingMap,
                          select: false,
                        };
                      }),
                    };
                  }),
                };
              } else {
                return monthMap;
              }
            })
          );

          toast.success(<h3>Item(s) foram repetidos para o próximo mês!</h3>);
        })

        .catch(() => {
          toast.error(<h3>Tente novamente!</h3>);
        })

        .finally(() => {
          setIsRequest(false);
        });
    } else {
      if (monthIdNextMonth) {
        createInstitutionShoppings(institutionRepeat)
          .then(({ reference: institutionReference }) => {
            updateMonthInstitution(monthIdNextMonth, institutionReference)
              .then(() => {
                setMonthList(
                  monthList.map((monthMap) => {
                    if (monthMap.id === monthIdNextMonth) {
                      return {
                        ...monthMap,
                        institutions: [
                          ...monthMap.institutions,
                          institutionRepeat,
                        ],
                      };
                    } else if (monthMap.id === month.id) {
                      return {
                        ...monthMap,
                        institutions: monthMap.institutions.map(
                          (institutionMap) => {
                            return {
                              ...institutionMap,
                              shoppings: institutionMap.shoppings.map(
                                (shoppingMap) => {
                                  return {
                                    ...shoppingMap,
                                    select: false,
                                  };
                                }
                              ),
                            };
                          }
                        ),
                      };
                    } else {
                      return monthMap;
                    }
                  })
                );

                toast.success(
                  <h3>Item(s) foram repetidos para o próximo mês!</h3>
                );
              })

              .catch(() => {
                toast.error(
                  <h3>
                    Algo de errado aconteceu ao atualizar o proximo mes com a
                    novo cartão
                  </h3>
                );
              });
          })

          .catch(() => {
            toast.error(
              <h3>Algo de errado aconteceu ao criar nova cartão com itens</h3>
            );
          })

          .finally(() => {
            setIsRequest(false);
          });
      } else {
        toast.info(<h3>Mês não encontrado!</h3>);
      }
    }
  };

  const removeShopping = async () => {
    setRequest(true);
    toast.info(<h3>Processando...</h3>, {
      isLoading: true,
      toastId: "process",
    });

    shoppings.map((shoppingMap) => {
      if (shoppingMap.select) {
        const shoppingReference = shoppingMap.reference;

        deleteShopping(shoppingReference)
          .then(() => {
            setShoppings(
              shoppings.filter((shoppingFilter) => !shoppingFilter.select)
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
          });
      }
    });

    setRequest(false);
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
    getMonths();
  }, [valueFilter]);

  React.useEffect(() => {
    const resultFilter = shoppings.filter((shopping) => shopping.select);

    setIsItensSelect(resultFilter.length > 0);
  }, [shoppings]);

  return (
    <>
      <HeaderTable
        setValueFilter={setValueFilter}
        options={institution.listResponsibleValues}
        onChange={onChangeSelectAll}
        isItensSelect={isItensSelect}
        handlerRepeat={repeat}
        isRequest={isRequest}
        removeShoppings={removeShopping}
      />

      <Scontent>
        {shoppings.length > 0 ? (
          shoppings.map((shopping, index) => (
            <span key={index}>
              <strong>
                <InputTable
                  type="checkbox"
                  disabled={request}
                  name="select"
                  id={shopping.reference}
                  checked={shopping.select}
                  onChange={(event) => {
                    onChangeSelectOnly(event, shopping);
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

                {shopping.isUpdate && (
                  <Save
                    width={20}
                    height={20}
                    disabled={request}
                    onClick={() => {
                      updateShopping(institution.reference, shopping);
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
