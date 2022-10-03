import React from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

import {
  createInstitution,
  createInstitutionShoppings,
  deleteInstitution,
  updateInstitutionShoppings,
} from "@graphqls/institution";

import {
  InstitutionType,
  MonthType,
  ResponsibleValuesType,
} from "../../Home/types";

import Nav from "@containers/components/Nav";
import Input from "@commons/Input";
import { Trash } from "@icons/Trash";
import { Add } from "@icons/Add";
import { Modal } from "@commons/Modal";
import { Save } from "@icons/Save";
import { maskDate } from "@helpers/masks";
import { Button } from "@commons/Button";
import { Repeat } from "@icons/Repeat";
import { CardMenu } from "@containers/components/CardMenu";
import { Expenses } from "@containers/components/Expenses";
import { Saside, Ssection, Swrapper } from "./styles";
import { removingInstitution } from "@helpers/removingInstitution";
import { getMonthNumber, updateMonthInstitution } from "@graphqls/month";

type PropsType = {
  monthList: MonthType[];
  month: MonthType;
  setMonthList: Function;
  responsibleTotalAmountList: ResponsibleValuesType[];
};

const initialInputInstitution = {
  reference: uuidv4(),
  name: "",
  amount: "0,00",
  listResponsibleValues: [],
  expirationDate: "2022-10-10",
  shoppings: [],
};

export const Content = ({
  monthList,
  setMonthList,
  month,
  responsibleTotalAmountList,
}: PropsType) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [institutionVisible, setInstitutionVisible] = React.useState<number>(0);

  const [inputInstitution, setInputInstitution] =
    React.useState<InstitutionType>(initialInputInstitution);

  const onChangeInputInstitution = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setInputInstitution((prevState) => ({
      ...prevState,
      [name]: maskDate(value, name),
    }));
  };

  const includeNewInstitution = async (monthId: string) => {
    const isFilled =
      inputInstitution.name != "" && inputInstitution.expirationDate != "";

    const newInstitution = { ...inputInstitution, reference: uuidv4() };

    if (isFilled) {
      const { reference: institutionReference } = await createInstitution(
        newInstitution
      );

      await updateMonthInstitution(monthId, institutionReference);

      setMonthList(
        monthList.map((monthMap) => {
          if (monthMap.id === monthId) {
            return {
              ...monthMap,
              institutions: [...monthMap.institutions, newInstitution],
            };
          } else {
            return monthMap;
          }
        })
      );

      setInputInstitution(initialInputInstitution);
      setIsVisible(false);
    } else {
      toast.info(<h3>Preencha nome e data do cartão!</h3>);
    }
  };

  const repeatInstitution = async (institution: InstitutionType) => {
    const { id: monthId, institutions } = await getMonthNumber(
      month.mesNumber + 1
    ).catch(() => {
      toast.error(<h3>Algo de errado aconteceu ao buscar próximo mês!</h3>);
    });

    const isInstitutionRepeat =
      institution.shoppings.filter((shopping) => shopping.select).length > 0;

    if (isInstitutionRepeat) {
      const institutionsFilter = institutions.filter(
        (institutionFilter: InstitutionType) =>
          institutionFilter.name === institution.name
      );

      const notInstitutionCreated = institutionsFilter.length === 0;

      if (notInstitutionCreated) {
        if (monthId) {
          const institutionRepeat = {
            ...institution,
            reference: uuidv4(),
            shoppings: institution.shoppings
              .filter((shopping) => shopping.select)
              .map((shopping) => ({
                ...shopping,
                reference: uuidv4(),
                select: false,
              })),
          };

          createInstitutionShoppings(institutionRepeat)
            .then(({ reference: institutionReference }) => {
              updateMonthInstitution(monthId, institutionReference)
                .then(() => {
                  setMonthList(
                    monthList.map((monthMap) => {
                      if (monthMap.id === monthId) {
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
            });
        } else {
          toast.info(<h3>Mês não encontrado!</h3>);
        }
      } else {
        const shoppingsRepeat = institution.shoppings
          .filter((shopping) => shopping.select)
          .map((shoppingMap) => {
            return {
              ...shoppingMap,
              reference: uuidv4(),
            };
          });

        const institutionReference = institutionsFilter[0].reference;

        updateInstitutionShoppings(institutionReference, shoppingsRepeat)
          .then(() => {
            setMonthList(
              monthList.map((monthMap) => {
                if (monthMap.id === monthId) {
                  return {
                    ...monthMap,
                    institutions: monthMap.institutions.map(
                      (institutionMap) => {
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
                      }
                    ),
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

            toast.success(<h3>Item(s) foram repetidos para o próximo mês!</h3>);
          })

          .catch(() => {
            toast.error(<h3>Tente novamente!</h3>);
          });
      }
    } else {
      toast.info(
        <h3>Marque o(s) item(s) que deseja reperir para o próximo mês!</h3>
      );
    }
  };

  const removeInstitution = (institution: InstitutionType) => {
    toast.info(<h3>Processando...</h3>, {
      isLoading: true,
      toastId: "process",
    });

    const isShoppings = institution.shoppings.length > 0;

    if (isShoppings) {
      toast.update("process", {
        type: "error",
        isLoading: false,
        render: <h3>Remova o(s) item(s) antes de excluir o cartão!</h3>,
        autoClose: 1000,
      });

      return;
    }

    deleteInstitution(institution.reference)
      .then(() => {
        setMonthList(
          monthList.map((monthMap) => {
            if (monthMap.id === month.id) {
              return {
                ...monthMap,
                institutions: removingInstitution(
                  monthMap.institutions,
                  institution.reference
                ),
              };
            } else {
              return monthMap;
            }
          })
        );

        toast.update("process", {
          type: "success",
          isLoading: false,
          render: <h3>{`${institution.name} removido com sucesso!`}</h3>,
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
  };

  if (month.institutions.length === 0) {
    return (
      <>
        <Swrapper>
          <nav>
            <Nav
              institutions={month.institutions}
              setInstitutionVisible={setInstitutionVisible}
              institutionVisible={institutionVisible}
            />
          </nav>

          <Ssection>
            <Saside>
              <CardMenu
                title="TOTAL GERAL"
                list={responsibleTotalAmountList}
                background="#de4f15"
                isFooter={
                  <>
                    <Button
                      color="#fff"
                      background="#B0C4DE"
                      icon={<Add width={15} height={15} />}
                      onClick={() => {
                        setIsVisible(!isVisible);
                      }}
                    >
                      Novo cartão
                    </Button>
                  </>
                }
              />
            </Saside>

            <Modal
              title="Novo cartão"
              isVisible={isVisible}
              handlerIsVisible={setIsVisible}
              footer={
                <Button
                  color="#fff"
                  background="#B0C4DE"
                  icon={<Save width={15} height={15} />}
                  onClick={() => {
                    includeNewInstitution(month.id);
                  }}
                >
                  Salvar
                </Button>
              }
            >
              <Input
                name="name"
                placeholder="Nome da instituição"
                id={inputInstitution.reference}
                value={inputInstitution.name}
                onChange={onChangeInputInstitution}
                required
              />

              <Input
                name="expirationDate"
                id={inputInstitution.reference}
                value={inputInstitution.expirationDate}
                onChange={onChangeInputInstitution}
                type="date"
                required
              />
            </Modal>
          </Ssection>
        </Swrapper>
      </>
    );
  }

  return (
    <>
      <Swrapper>
        <nav>
          <Nav
            institutions={month.institutions}
            setInstitutionVisible={setInstitutionVisible}
            institutionVisible={institutionVisible}
          />
        </nav>

        {month.institutions.map((institutionMap, index) => {
          return (
            <div key={index}>
              {index === institutionVisible && (
                <Ssection>
                  <Saside>
                    <CardMenu
                      title={`TOTAL ${institutionMap.name.toUpperCase()}`}
                      list={institutionMap.listResponsibleValues}
                      background="#029b99"
                    />
                    <CardMenu
                      title="TOTAL GERAL"
                      list={responsibleTotalAmountList}
                      background="#de4f15"
                      isFooter={
                        <>
                          <Button
                            color="#fff"
                            background="#B0C4DE"
                            icon={<Add width={15} height={15} />}
                            onClick={() => {
                              setIsVisible(!isVisible);
                            }}
                          >
                            Novo cartão
                          </Button>
                          <Button
                            color="#fff"
                            background="#B0C4DE"
                            icon={<Repeat width={15} height={15} />}
                            onClick={() => {
                              repeatInstitution(institutionMap);
                            }}
                          >
                            Repetir item(s)
                          </Button>
                          <Button
                            color="#fff"
                            background="#B0C4DE"
                            icon={<Trash width={15} height={15} />}
                            onClick={() => {
                              removeInstitution(institutionMap);
                            }}
                          >
                            Excluir instituição
                          </Button>
                        </>
                      }
                    />
                  </Saside>
                  <Expenses
                    institution={institutionMap}
                    monthList={monthList}
                    setMonthList={setMonthList}
                    month={month}
                  />
                  <Modal
                    title="Novo cartão"
                    isVisible={isVisible}
                    handlerIsVisible={setIsVisible}
                    footer={
                      <Button
                        color="#fff"
                        background="#B0C4DE"
                        icon={<Save width={15} height={15} />}
                        onClick={() => {
                          includeNewInstitution(month.id);
                        }}
                      >
                        Salvar
                      </Button>
                    }
                  >
                    <Input
                      name="name"
                      placeholder="Nome da instituição"
                      id={inputInstitution.reference}
                      value={inputInstitution.name}
                      onChange={onChangeInputInstitution}
                    />

                    <Input
                      name="expirationDate"
                      id={inputInstitution.reference}
                      value={inputInstitution.expirationDate}
                      onChange={onChangeInputInstitution}
                      type="date"
                    />
                  </Modal>
                </Ssection>
              )}
            </div>
          );
        })}
      </Swrapper>
    </>
  );
};
