import React from "react";
import { v4 as uuidv4 } from "uuid";

import { Scontainer, Stable } from "./styles";

import useListCollapsibreTable from "../../../hooks/useListCollapsibreTable";

import Header from "./components/Header";
import IconTable from "./components/IconTable";
import InputTable from "./components/InputTable";
import ContentAmount from "./components/ContentAmount";
import { ShoppingTable } from "./components/ShoppingTable";
import { formatMorney } from "../../../helpers/formatMorney";

type ShoppingType = {
  id: string;
  description: string;
  amount: string | number;
  responsible: string;
};

type InstitutionsType = {
  id: string;
  name: string;
  amount: string | number;
  expirationDate: string;
  shoppings: ShoppingType[];
};

type PropsType = {
  institutions: InstitutionsType[];
};

const initialInputInstitution = {
  id: uuidv4(),
  name: "",
  amount: "",
  expirationDate: "",
  shoppings: [],
};

function HomeContainer({ institutions }: PropsType) {
  const {
    listTable,
    setListTable,
    handleIncludeNewBuy,
    handleInputNewBuy,
    newBuy,
    submenusExpanded,
    handleInputChange,
  } = useListCollapsibreTable(institutions);

  const [inputInstitution, setInputInstitution] =
    React.useState<InstitutionsType>(initialInputInstitution);

  const handleInputInstitution = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setInputInstitution((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlerIncludeNewInstitution = () => {
    const isFilled =
      inputInstitution.name != "" &&
      inputInstitution.amount != "" &&
      inputInstitution.expirationDate != "";

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
      <Header handlerIncludeNewInstitution={handlerIncludeNewInstitution} />
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
                  <td>{formatMorney(institution.amount)}</td>
                  <td>{institution.expirationDate}</td>
                </tr>

                {institution.showSubmenus && (
                  <ShoppingTable
                    shoppingList={institution.shoppings}
                    institution={institution}
                    handleIncludeNewBuy={handleIncludeNewBuy}
                    handleInputNewBuy={handleInputNewBuy}
                    newBuy={newBuy}
                    handleInputChange={handleInputChange}
                  />
                )}
              </>
            );
          })}

          <tr>
            <td>
              <InputTable
                name="name"
                id={inputInstitution.id}
                value={inputInstitution.name}
                onChange={handleInputInstitution}
                onKeyUp={handlerIncludeNewInstitution}
              />
            </td>
            <td>
              <InputTable
                name="amount"
                id={inputInstitution.id}
                value={inputInstitution.amount}
                onChange={handleInputInstitution}
                onKeyUp={handlerIncludeNewInstitution}
                disabled
              />
            </td>
            <td>
              <InputTable
                name="expirationDate"
                id={inputInstitution.id}
                value={inputInstitution.expirationDate}
                onChange={handleInputInstitution}
                onKeyUp={handlerIncludeNewInstitution}
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
