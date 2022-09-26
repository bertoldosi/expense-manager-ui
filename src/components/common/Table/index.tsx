import React from "react";
import { InstitutionType } from "../../containers/HomeContainer/types";
import { Save } from "../../icons/Save";
import { Trash } from "../../icons/Trash";
import InputTable from "../InputTable";

import { Scontent } from "./styles";

type PropsType = {
  institution: InstitutionType;
};

export const Table = ({ institution }: PropsType) => {
  return (
    <Scontent>
      {institution.shoppings.map((shopping) => (
        <span>
          <strong>
            <InputTable
              type="checkbox"
              // disabled={request}
              name="repeat"
              id={shopping.reference}
              checked={shopping.repeat}
              // onChange={(event) => {
              //   onChangeUpdateRepeatShopping(event, institution.reference);
              // }}
            />
            <InputTable
              // disabled={request}
              name="description"
              id={shopping.reference}
              value={shopping.description}
              // onChange={(event) => {
              //   onChangeUpdateShopping(event, institution.reference);
              // }}
            />
          </strong>
          <strong>
            <InputTable
              // disabled={request}
              name="amount"
              id={shopping.reference}
              value={shopping.amount}
              // onChange={(event) => {
              //   onChangeUpdateShopping(event, institution.reference);
              // }}
            />
          </strong>
          <strong>
            <InputTable
              // disabled={request}
              name="responsible"
              id={shopping.reference}
              value={shopping.responsible}
              // onChange={(event) => {
              //   onChangeUpdateShopping(event, institution.reference);
              // }}
            />
          </strong>
          <strong>
            {shopping.isUpdate ? (
              <Save
                width={20}
                height={20}
                // disabled={request}
                // onClick={() => {
                //   updateShopping(institution.reference, shopping);
                // }}
              />
            ) : (
              <Trash
                width={20}
                height={20}
                // disabled={request}
                // onClick={() => {
                //   removeShopping(institution.reference, shopping);
                // }}
              />
            )}
          </strong>
        </span>
      ))}
    </Scontent>
  );
};
