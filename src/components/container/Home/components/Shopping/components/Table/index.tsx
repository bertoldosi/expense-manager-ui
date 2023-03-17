import React from "react";

import { Save } from "@icons/Save";
import { HeaderTable } from "../../components/HeaderTable";
import { maskMorney } from "@helpers/masks";
import { deleteShopping } from "@graphqls/shopping";
import { SelectStatus } from "@commons/SelectStatus";
import InputTable from "@containers/Home/components/Shopping/components/InputTable";
import { updateShopping as upShopping } from "@graphqls/shopping";

import { NoResult, Scontent, ScontentModal } from "./styles";
import { Modal } from "@commons/Modal";
import { Button } from "@commons/Button";
import Input from "@commons/Input";
import { customToast } from "@commons/CustomToast";
import { UserContext, UserContextType } from "src/context/userContext";
import { InstitutionType, ShoppingType } from "@interfaces/*";

type PropsType = {
  institution: InstitutionType;
};

const initialNewAllShopping = {
  responsible: "",
  paymentStatus: "aberto",
  select: false,
};

export const Table = ({ institution }: PropsType) => {
  const { getMonths } = React.useContext(UserContext) as UserContextType;

  const [valueFilter, setValueFilter] = React.useState("todos");
  const [shoppings, setShoppings] = React.useState<ShoppingType[]>([]);
  const [isItensSelect, setIsItensSelect] = React.useState(false);
  const [isRequest, setIsRequest] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [newAllShopping, setNewAllShopping] = React.useState(
    initialNewAllShopping
  );

  const onChangeUpdateShopping = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value, name } = event.target;

    setShoppings(
      shoppings.map((shoppingMap) => {
        if (shoppingMap.reference === id) {
          return {
            ...shoppingMap,
            [name]: maskMorney(value, name),
            isUpdate: true,
          };
        } else {
          return shoppingMap;
        }
      })
    );
  };

  const onChangeUpdateAllShopping = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setNewAllShopping((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChangeSelectOnly = (event: any, shopping: ShoppingType) => {
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

  const removeShopping = async () => {
    setIsRequest(true);

    const shoppingSelecteds = shoppings.filter(
      (shoppingFilter) => shoppingFilter.select
    );

    let position = 0;
    while (shoppingSelecteds[position]) {
      const shoppingReference = shoppingSelecteds[position].reference;
      await deleteShopping(shoppingReference)
        .then(() => {
          customToast("success", "Deletado com sucesso!");
        })
        .catch(() => {
          customToast("error", "Tente novamente!");
        });

      position++;
    }

    getMonths();
    setValueFilter("todos");
    setIsRequest(false);
  };

  const updateShopping = async (shoppingUpdate: ShoppingType) => {
    setIsRequest(true);

    upShopping(shoppingUpdate)
      .then(() => {
        getMonths();
        customToast("success", "Alterado com sucesso!");
      })

      .catch(() => {
        customToast("error", "Tente novamente!");
      })

      .finally(() => {
        setIsRequest(false);
      });
  };

  return (
    <>
      <HeaderTable
        setValueFilter={setValueFilter}
        options={institution.listResponsibleValues}
        onChange={onChangeSelectAll}
        isItensSelect={isItensSelect}
        handlerRepeat={() => {}}
        isRequest={isRequest}
        removeShoppings={removeShopping}
        setIsVisible={setIsVisible}
        valueFilter={valueFilter}
      />

      <Scontent>
        {shoppings.length > 0 ? (
          shoppings.map((shopping, index) => (
            <span key={index}>
              <strong>
                <InputTable
                  className={shopping.paymentStatus}
                  type="checkbox"
                  disabled={isRequest}
                  name="select"
                  id={shopping.reference}
                  checked={shopping.select}
                  onChange={(event) => {
                    onChangeSelectOnly(event, shopping);
                  }}
                />
                <InputTable
                  className={shopping.paymentStatus}
                  disabled={isRequest}
                  name="description"
                  id={shopping.reference}
                  value={shopping.description}
                  handleEnter={() => {
                    updateShopping(shopping);
                  }}
                  onChange={onChangeUpdateShopping}
                />
              </strong>
              <strong>
                <InputTable
                  className={shopping.paymentStatus}
                  disabled={isRequest}
                  name="amount"
                  id={shopping.reference}
                  value={shopping.amount}
                  handleEnter={() => {
                    updateShopping(shopping);
                  }}
                  onChange={onChangeUpdateShopping}
                />
              </strong>
              <strong>
                <InputTable
                  className={shopping.paymentStatus}
                  disabled={isRequest || valueFilter != "todos"}
                  name="responsible"
                  id={shopping.reference}
                  value={shopping.responsible}
                  handleEnter={() => {
                    updateShopping(shopping);
                  }}
                  onChange={onChangeUpdateShopping}
                />
              </strong>
              <strong>
                <SelectStatus
                  selectClassName={shopping.paymentStatus}
                  optionClassName={shopping.paymentStatus}
                  name="paymentStatus"
                  id={shopping.reference}
                  value={shopping.paymentStatus}
                  options={[{ name: "aberto" }, { name: "pago" }]}
                  onChange={onChangeUpdateShopping}
                />

                {shopping.isUpdate && (
                  <Save
                    width={20}
                    height={20}
                    disabled={isRequest}
                    onClick={() => {
                      updateShopping(shopping);
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

      <Modal
        title="Editando item(s)"
        isVisible={isVisible}
        handlerIsVisible={setIsVisible}
        footer={
          <Button color="#fff" background="#B0C4DE">
            Salvar
          </Button>
        }
      >
        <ScontentModal>
          <Input
            autoFocus
            disabled={isRequest}
            name="responsible"
            placeholder="Nome do responsavel"
            id="responsible"
            value={newAllShopping.responsible}
            onChange={onChangeUpdateAllShopping}
          />

          <SelectStatus
            selectClassName={newAllShopping.paymentStatus}
            optionClassName={newAllShopping.paymentStatus}
            name="paymentStatus"
            id="paymentStatus"
            value={newAllShopping.paymentStatus}
            options={[{ name: "aberto" }, { name: "pago" }]}
            onChange={onChangeUpdateAllShopping}
          />
        </ScontentModal>
      </Modal>
    </>
  );
};
