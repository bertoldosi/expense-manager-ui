import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useFormik } from "formik";

import { updateMonthInstitution } from "@graphqls/month";
import { createInstitution, deleteInstitution } from "@graphqls/institution";

import { InstitutionType, MonthType } from "@interfaces/";

import Nav from "@containers/Home/components/Institution/components/Nav";
import Input from "@commons/Input";
import { Modal } from "@commons/Modal";
import { Button } from "@commons/Button";
import { CardMenu } from "@containers/Home/components/Institution/components/CardMenu";
import { Shopping } from "@containers/Home/components/Shopping";
import { Saside, ScontainerModal, Ssection, Swrapper } from "./styles";
import { customToast } from "@commons/CustomToast";
import validationSchema from "./validations";
import { Error } from "@commons/Error";
import { UserContext, UserContextType } from "src/context/userContext";

type PropsType = {
  month: MonthType;
};

const initialValues = {
  reference: uuidv4(),
  name: "",
  amount: "0",
  listResponsibleValues: [],
  expirationDate: "",
  shoppings: [],
};

export const Institution = ({ month }: PropsType) => {
  const {
    getMonths,
    listResponsibleTotalMonth,
    listResponsibleTotalYear,
    nowCard,
    theme,
    handlerNameCard,
  } = React.useContext(UserContext) as UserContextType;

  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [isRequest, setIsRequest] = React.useState<boolean>(false);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      setIsRequest(true);
      const payload = {
        ...values,
        reference: uuidv4(),
      };

      const { reference, name } = await createInstitution(payload);

      await updateMonthInstitution(month.id, reference)
        .then(() => {
          getMonths();
          customToast("success", `${name} incluído com sucesso!`);
          handlerNameCard(name);
        })
        .catch(() => {
          customToast("error", "Tente novamente!");
        })
        .finally(() => {
          setIsVisible(false);
          setIsRequest(false);
          formik.resetForm();
        });
    },

    validationSchema,
  });

  const removeInstitution = (institution: InstitutionType) => {
    setIsRequest(true);
    const isShoppings = institution.shoppings.length > 0;

    if (isShoppings) {
      customToast("info", "Remova o(s) item(s) antes de excluir o cartão!");
      return;
    }

    deleteInstitution(institution.reference)
      .then(() => {
        getMonths();
        customToast("success", `${institution.name} removido com sucesso!`);
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
      <Swrapper>
        <nav>
          <Nav institutions={month.institutions} />
        </nav>

        {month.institutions.length === 0 ? (
          <Ssection>
            <Saside>
              <CardMenu
                title="SEM CARTÃO"
                list={listResponsibleTotalMonth}
                background={theme.backgroundPrimary}
                isFooter={
                  <>
                    <Button color="#fff" background={theme.backgroundPrimary}>
                      Novo cartão
                    </Button>
                  </>
                }
              />
            </Saside>
          </Ssection>
        ) : (
          month.institutions.map((institutionMap, index) => {
            if (institutionMap.name === nowCard) {
              return (
                <div key={index}>
                  <Ssection>
                    <Saside>
                      <CardMenu
                        title={`TOTAL ${institutionMap.name.toUpperCase()}`}
                        list={institutionMap.listResponsibleValues}
                        background={theme.backgroundPrimary}
                        isFooter={
                          <>
                            <Button
                              color="#fff"
                              background="#1b66ff"
                              width="100%"
                            >
                              Novo cartão
                            </Button>
                            <Button
                              color="#fff"
                              background="#ff3d3d"
                              width="100%"
                            >
                              Excluir {institutionMap.name}
                            </Button>
                          </>
                        }
                      />
                      <CardMenu
                        title="TOTAL MENSAL"
                        list={listResponsibleTotalMonth}
                        background={theme.backgroundPrimary}
                      />
                    </Saside>
                    <Shopping institution={institutionMap} month={month} />
                  </Ssection>
                </div>
              );
            }
          })
        )}
      </Swrapper>

      <Modal
        title="Novo cartão"
        isVisible={isVisible}
        handlerIsVisible={setIsVisible}
      >
        <ScontainerModal onSubmit={formik.handleSubmit}>
          <Input
            autoComplete="off"
            autoFocus
            name="name"
            placeholder="Nome da instituição"
            id={formik.values.reference}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && <Error>{formik.errors.name}</Error>}
          />

          <Input
            autoComplete="off"
            name="expirationDate"
            id={formik.values.reference}
            value={formik.values.expirationDate}
            onChange={formik.handleChange}
            type="date"
            error={
              formik.touched.expirationDate && (
                <Error>{formik.errors.expirationDate}</Error>
              )
            }
          />

          <Button color="#fff" background={theme.backgroundPrimary}>
            Salvar
          </Button>
        </ScontainerModal>
      </Modal>
    </>
  );
};
