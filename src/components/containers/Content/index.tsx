import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Expenses } from "../Expenses";
import { CardMenu } from "../../common/CardMenu";
import Nav from "../../common/Nav";

import { Sarticle, Saside, Ssection, Swrapper } from "./styles";
import { Modal } from "../../common/Modal";
import Input from "../../common/Input";
import { InstitutionType, MonthType } from "../HomeContainer/types";
import useTable from "../../../hooks/useTable";
import useMonth from "../../../hooks/useMonth";
import { maskDate } from "../../../helpers/masks";
import { createInstitution } from "../../../graphql/institution";
import { updateMonthInstitution } from "../../../graphql/month";
import { Button } from "../../common/Button";
import { Save } from "../../icons/Save";

type PropsType = {
  monthList: MonthType[];
  month: MonthType;
  setMonthList: Function;
};

const initialInputInstitution = {
  reference: uuidv4(),
  name: "",
  amount: "0,00",
  listResponsibleValues: [],
  expirationDate: "",
  shoppings: [],
};

export const Content = ({ monthList, setMonthList, month }: PropsType) => {
  const { months, nowMonth } = useMonth();

  const [isVisible, setIsVisible] = React.useState<boolean>(false);
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

  return (
    <>
      <Swrapper>
        <nav>
          <Nav institutions={month.institutions} />
        </nav>

        <Ssection>
          <Saside>
            <CardMenu />
            <CardMenu
              isFooter={true}
              setIsVisible={setIsVisible}
              isVisible={isVisible}
            />
          </Saside>
          <Sarticle>
            <Expenses />
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
              >
                Salvar
              </Button>
            }
          >
            <Input
              name="name"
              id={inputInstitution.reference}
              value={inputInstitution.name}
              onChange={onChangeInputInstitution}
            />
            <Input
              name="amount"
              id={inputInstitution.reference}
              value={inputInstitution.amount}
              onChange={onChangeInputInstitution}
              disabled
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
      </Swrapper>
    </>
  );
};
