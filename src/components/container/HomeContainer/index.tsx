import React from "react";
import { v4 as uuidv4 } from "uuid";

import { Scontainer, Stable } from "./styles";

import useTable from "../../../hooks/useTable";

import Header from "./components/Header";
import IconTable from "./components/IconTable";
import InputTable from "./components/InputTable";
import TableTotalAmount from "./components/TableTotalAmount";
import { ShoppingTable } from "./components/ShoppingTable";
import { formatMorney } from "../../../helpers/formatMorney";
import { maskDate } from "../../../helpers/masks";
import { InstitutionType } from "./types";
import { addingResponsibleTotalAmount } from "../../../helpers/addingResponsibleTotalAmount";

type PropsType = {
  institutions: InstitutionType[];
};

const initialInputInstitution = {
  id: uuidv4(),
  name: "",
  amount: "0,00",
  listResponsibleValues: [],
  expirationDate: "",
  shoppings: [],
};

function HomeContainer({ institutions }: PropsType) {
  const {
    institutionList,
    setInstitutionList,
    handlerShoppingsExpanded,
    responsibleTotalAmountList,
    setResponsibleTotalAmountList,
  } = useTable(institutions);

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

  const includeNewInstitution = () => {
    const isFilled =
      inputInstitution.name != "" &&
      inputInstitution.amount != "" &&
      inputInstitution.expirationDate != "";

    if (isFilled) {
      setInstitutionList((prevState) => {
        return [...prevState, inputInstitution];
      });

      setInputInstitution(initialInputInstitution);
    } else {
      alert("Precisa preencher todos os campos");
    }
  };

  React.useEffect(() => {
    setResponsibleTotalAmountList(
      addingResponsibleTotalAmount(institutionList)
    );
  }, [institutionList]);

  return (
    <Scontainer>
      <Header includeNewInstitution={includeNewInstitution} />
      <Stable>
        <thead>
          <tr>
            <th>Instituição</th>
            <th>Total</th>
            <th>Vencimento</th>
          </tr>
        </thead>

        <tbody>
          {institutionList.map((institution, key) => {
            return (
              <>
                <tr
                  key={key}
                  onClick={() => {
                    handlerShoppingsExpanded(institution.id);
                  }}
                >
                  <td>
                    <IconTable item={institution} />
                  </td>
                  <td>{formatMorney(institution.amount)}</td>
                  <td>{institution.expirationDate}</td>
                </tr>

                {institution.isShowShoppings && (
                  <ShoppingTable
                    shoppingList={institution.shoppings}
                    institution={institution}
                    institutionList={institutionList}
                    setInstitutionList={setInstitutionList}
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
                onChange={onChangeInputInstitution}
                onKeyUp={includeNewInstitution}
              />
            </td>
            <td>
              <InputTable
                name="amount"
                id={inputInstitution.id}
                value={inputInstitution.amount}
                onChange={onChangeInputInstitution}
                onKeyUp={includeNewInstitution}
                disabled
              />
            </td>
            <td>
              <InputTable
                name="expirationDate"
                id={inputInstitution.id}
                value={inputInstitution.expirationDate}
                onChange={onChangeInputInstitution}
                onKeyUp={includeNewInstitution}
                type="date"
              />
            </td>
          </tr>
        </tbody>
      </Stable>

      <TableTotalAmount listResponsibleValues={responsibleTotalAmountList} />
    </Scontainer>
  );
}

export default HomeContainer;
