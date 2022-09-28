import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../../common/Button";
import Input from "../../common/Input";
import { Add } from "../../icons/Add";
import { Table } from "../../common/Table";
import { ToastContainer, toast } from "react-toastify";

import { createShopping } from "../../../graphql/shopping";
import { updateInstitutionShopping } from "../../../graphql/institution";
import { sumAmountMoney } from "../../../helpers/sumAmountMoney";
import { sumAmountResponsible } from "../../../helpers/sumAmountResponsible";
import { focusInput } from "../../../helpers/focusInput";
import { maskMorney } from "../../../helpers/masks";

import { Scontent, Sheader } from "./styles";

import {
  InstitutionType,
  MonthType,
  ShoppingType,
} from "../HomeContainer/types";

type PropsType = {
  institution: InstitutionType;
  monthList: MonthType[];
  setMonthList: Function;
  month: MonthType;
};

const initialNewShopping = {
  reference: uuidv4(),
  description: "",
  amount: "",
  responsible: "",
  repeat: false,
};

export const Expenses = ({
  institution,
  monthList,
  setMonthList,
  month,
}: PropsType) => {
  const [request, setRequest] = React.useState(false);
  const [newShopping, setNewShopping] =
    React.useState<ShoppingType>(initialNewShopping);

  const onChangeAddShopping = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewShopping((prevState) => ({
      ...prevState,
      [name]: maskMorney(value, name),
    }));
  };

  const includeShopping = async (institutionReference: string) => {
    setRequest(true);

    const responsible = newShopping.responsible
      ? newShopping.responsible
      : "SEM/ATRIB";

    const isFilled = newShopping.description != "" && newShopping.amount != "";
    const shopping = {
      ...newShopping,
      reference: uuidv4(),
      responsible,
    };

    if (isFilled) {
      createShopping(shopping).then(({ reference: shoppingReference }) => {
        updateInstitutionShopping(
          institutionReference,
          shoppingReference
        ).finally(() => {
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
                        amount: sumAmountMoney(
                          institutionMap.amount,
                          newShopping.amount
                        ),
                        shoppings: [
                          ...institutionMap.shoppings,
                          {
                            ...newShopping,
                            reference: uuidv4(),
                            responsible: responsible,
                          },
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

          setNewShopping(initialNewShopping);
          setRequest(false);
          focusInput("description");
        });
      });
    } else {
      toast.info(<h3>Preencha descrição e valor do item!</h3>);
      setRequest(false);
    }
  };

  return (
    <Scontent>
      <Sheader>
        <Input
          autofocus
          name="description"
          placeholder="Descrição da compra"
          id={newShopping.reference}
          value={newShopping.description}
          onChange={onChangeAddShopping}
          onKeyUp={() => {
            includeShopping(institution.reference);
          }}
        />
        <Input
          disabled={request}
          name="amount"
          placeholder="R$ 00,00"
          id={newShopping.reference}
          value={newShopping.amount}
          onChange={onChangeAddShopping}
          onKeyUp={() => {
            includeShopping(institution.reference);
          }}
        />
        <Input
          disabled={request}
          name="responsible"
          placeholder="Nome do responsavel"
          id={newShopping.reference}
          value={newShopping.responsible}
          onChange={onChangeAddShopping}
          onKeyUp={() => {
            includeShopping(institution.reference);
          }}
        />
        <Button
          disabled={request}
          color="#fff"
          background="#B0C4DE"
          icon={<Add width={15} height={15} />}
          onClick={() => {
            includeShopping(institution.reference);
          }}
        >
          Adicionar
        </Button>
      </Sheader>
      <Table
        institution={institution}
        month={month}
        monthList={monthList}
        setMonthList={setMonthList}
        request={request}
        setRequest={setRequest}
      />
    </Scontent>
  );
};
