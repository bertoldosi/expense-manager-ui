import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Expenses } from "../Expenses";
import { CardMenu } from "../../common/CardMenu";
import Nav from "../../common/Nav";

import { Sarticle, Saside, Ssection, Swrapper } from "./styles";
import { Modal } from "../../common/Modal";
import Input from "../../common/Input";
import {
  InstitutionType,
  MonthType,
  ResponsibleValuesType,
} from "../HomeContainer/types";
import useTable from "../../../hooks/useTable";
import useMonth from "../../../hooks/useMonth";
import { maskDate } from "../../../helpers/masks";
import {
  createInstitution,
  createInstitutionShoppings,
  updateInstitutionShoppings,
} from "../../../graphql/institution";
import { getMonthNumber, updateMonthInstitution } from "../../../graphql/month";
import { Button } from "../../common/Button";
import { Save } from "../../icons/Save";
import { sumAmountResponsible } from "../../../helpers/sumAmountResponsible";
import { updateAmountShoppings } from "../../../helpers/updateAmountShoppings";
import { Repeat } from "../../icons/Repeat";
import { Add } from "../../icons/Add";

type PropsType = {
  monthList: MonthType[];
  month: MonthType;
  setMonthList: Function;
  handlerShoppingsExpanded: Function;
  responsibleTotalAmountList: ResponsibleValuesType[];
};

const initialInputInstitution = {
  reference: uuidv4(),
  name: "",
  amount: "0,00",
  listResponsibleValues: [],
  expirationDate: "",
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
      inputInstitution.name != "" &&
      inputInstitution.amount != "" &&
      inputInstitution.expirationDate != "";

    const newInstitution = { ...inputInstitution, reference: uuidv4() };

    const { reference: institutionReference } = await createInstitution(
      newInstitution
    );

    await updateMonthInstitution(monthId, institutionReference);

    if (isFilled) {
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
    } else {
      alert("Precisa preencher todos os campos");
    }
  };

  const repeatInstitution = async (institution: InstitutionType) => {
    const { id: monthId, institutions } = await getMonthNumber(
      month.mesNumber + 1
    );

    const isInstitutionRepeat =
      institution.shoppings.filter((shopping) => shopping.repeat).length > 0;

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
            shoppings: institution.shoppings.filter(
              (shopping) => shopping.repeat
            ),
          };

          setMonthList(
            monthList.map((monthMap) => {
              if (monthMap.id === month.id) {
                return {
                  ...monthMap,
                  institutions: [...monthMap.institutions, institutionRepeat],
                };
              } else {
                return monthMap;
              }
            })
          );

          setMonthList(
            monthList.map((monthMap) => {
              if (monthMap.id === month.id) {
                return {
                  ...monthMap,
                  institutions: monthMap.institutions.map((institutionMap) => {
                    return {
                      ...institutionMap,
                      shoppings: institutionMap.shoppings.map((shoppingMap) => {
                        return {
                          ...shoppingMap,
                          repeat: false,
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

          const { reference: institutionReference } =
            await createInstitutionShoppings(institutionRepeat);
          await updateMonthInstitution(monthId, institutionReference);
        } else {
          alert("Mês não encontrado!");
        }
      } else {
        const shoppingsRepeat = institution.shoppings.filter(
          (shopping) => shopping.repeat
        );

        const institutionReference = institutionsFilter[0].reference;

        setMonthList(
          monthList.map((monthMap) => {
            if (monthMap.id === monthId) {
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
            } else {
              return monthMap;
            }
          })
        );

        setMonthList(
          monthList.map((monthMap) => {
            if (monthMap.id === month.id) {
              return {
                ...monthMap,
                institutions: monthMap.institutions.map((institutionMap) => {
                  return {
                    ...institutionMap,
                    shoppings: institutionMap.shoppings.map((shoppingMap) => {
                      return {
                        ...shoppingMap,
                        repeat: false,
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

        await updateInstitutionShoppings(institutionReference, shoppingsRepeat);
      }
    } else {
      alert("Marque as compras que deseja reperir para o próximo mês!");
    }
  };

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
            <>
              {index === institutionVisible && (
                <Ssection>
                  <Saside>
                    <CardMenu
                      title="TOTAL POR CARTÃO"
                      list={institutionMap.listResponsibleValues}
                    />
                    <CardMenu
                      title="TOTAL GERAL"
                      list={responsibleTotalAmountList}
                      isFooter={
                        <>
                          <Button
                            color="#fff"
                            background="#B0C4DE"
                            icon={<Repeat width={15} height={15} />}
                            onClick={() => {
                              repeatInstitution(institutionMap);
                            }}
                          >
                            Repetir compra
                          </Button>
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
                  <Sarticle>
                    <Expenses
                      institution={institutionMap}
                      monthList={monthList}
                      setMonthList={setMonthList}
                      month={month}
                    />
                  </Sarticle>
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
            </>
          );
        })}
      </Swrapper>
    </>
  );
};
