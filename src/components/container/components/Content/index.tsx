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
  getMonths: Function;
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
  getMonths,
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
                            icon={<Trash width={15} height={15} />}
                            onClick={() => {
                              removeInstitution(institutionMap);
                            }}
                          >
                            Excluir {institutionMap.name}
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
                    getMonths={getMonths}
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
