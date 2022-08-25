import React from "react";
import { v4 as uuidv4 } from "uuid";

import { Scontainer, Stable } from "./styles";

import useListCollapsibreTable from "../../../hooks/useListCollapsibreTable";

import Header from "./components/Header";
import IconTable from "./components/IconTable";
import InputTable from "./components/InputTable";
import ContentAmount from "./components/ContentAmount";
import { ShoppingTable } from "./components/ShoppingTable";

type ShoppingType = {
  id: string;
  description: string;
  amount: string;
  responsible: string;
};

type MonthlyExpensesType = {
  id: string;
  institution: string;
  amount: string;
  expiration_date: string;
  shopping: ShoppingType[];
};

type Props = {
  monthly_expenses: MonthlyExpensesType[];
};

const initialInputInstitution = {
  id: uuidv4(),
  institution: "",
  amount: "R$ 00,00",
  expiration_date: "",
  shopping: [],
};

function HomeContainer({ monthly_expenses }: Props) {
  const { listTable, setListTable, submenusExpanded } =
    useListCollapsibreTable(monthly_expenses);

  const [inputInstitution, setInputInstitution] =
    React.useState<MonthlyExpensesType>(initialInputInstitution);

  const handleInputInstitution = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setInputInstitution((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const includeNewInstitution = () => {
    const isFilled =
      inputInstitution.institution != null &&
      inputInstitution.amount != null &&
      inputInstitution.expiration_date;

    if (isFilled) {
      setListTable((prevState) => {
        return [...prevState, inputInstitution];
      });

      setInputInstitution(initialInputInstitution);
    } else {
      alert("Precisa preencher todos os campos");
    }
  };

  return (
    <Scontainer>
      <Header handlerIncludeNewInstitution={includeNewInstitution} />
      <Stable>
        <thead>
          <tr>
            <th>Instituição</th>
            <th>Total</th>
            <th>Vencimento</th>
          </tr>
        </thead>

        <tbody>
          {listTable.map((institution) => {
            return (
              <>
                <tr
                  key={institution.id}
                  onClick={() => {
                    submenusExpanded(institution.id);
                  }}
                >
                  <td>
                    <IconTable item={institution} />
                  </td>
                  <td>{institution.amount}</td>
                  <td>{institution.expiration_date}</td>
                </tr>

                {institution.showSubmenus && (
                  <ShoppingTable shoppingList={institution.shopping} />
                )}
              </>
            );
          })}

          <tr>
            <td>
              <InputTable
                name="institution"
                id={inputInstitution.id}
                value={inputInstitution.institution}
                onChange={handleInputInstitution}
              />
            </td>
            <td>
              <InputTable
                name="amount"
                id={inputInstitution.id}
                value={inputInstitution.amount}
                onChange={handleInputInstitution}
                disabled
              />
            </td>
            <td>
              <InputTable
                name="expiration_date"
                id={inputInstitution.id}
                value={inputInstitution.expiration_date}
                onChange={handleInputInstitution}
              />
            </td>
          </tr>
        </tbody>
      </Stable>

      <ContentAmount />
    </Scontainer>
  );
}

export default HomeContainer;
