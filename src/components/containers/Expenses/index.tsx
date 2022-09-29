import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../../common/Button";
import Input from "../../common/Input";
import { Add } from "../../icons/Add";
import { Table } from "../../common/Table";
import { toast } from "react-toastify";

import { updateInstitutionShoppings } from "../../../graphql/institution";
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
    toast.info(<h3>Processando...</h3>, {
      isLoading: true,
      toastId: "process",
    });

    setRequest(true);

    const shopping = {
      ...newShopping,
      reference: uuidv4(),
    };

    updateInstitutionShoppings(institutionReference, [shopping])
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
                      amount: sumAmountMoney(
                        institutionMap.amount,
                        shopping.amount
                      ),
                      shoppings: [...institutionMap.shoppings, shopping],
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
          render: <h3>Adicionado com sucesso!</h3>,
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
        setNewShopping(initialNewShopping);
        setRequest(false);
        focusInput("description");
      });
  };

  return (
    <Scontent>
      <Sheader>
        <Input
          autofocus
          name="description"
          placeholder="Descrição do item"
          id={newShopping.reference}
          value={newShopping.description}
          onChange={onChangeAddShopping}
        />
        <Input
          disabled={request}
          name="amount"
          placeholder="R$ 00,00"
          id={newShopping.reference}
          value={newShopping.amount}
          onChange={onChangeAddShopping}
        />
        <Input
          disabled={request}
          name="responsible"
          placeholder="Nome do responsavel"
          id={newShopping.reference}
          value={newShopping.responsible}
          onChange={onChangeAddShopping}
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
