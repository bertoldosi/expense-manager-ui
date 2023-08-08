import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { useSession } from "next-auth/react";

import { ExpenseType } from "@interfaces/*";
import { Card } from "@commons/Card";

import { userContextData, userContextDataType } from "@context/userContextData";

import { Scontainer, Sbuttons } from "./styles";
import { Loading } from "@commons/Loading";

export const ChangeExpense = () => {
  const cookies = new Cookies();
  const router = useRouter();
  const { data: session } = useSession();

  const { getUser, user, getInstitution, setSelectedInstitution } =
    React.useContext(userContextData) as userContextDataType;

  const [isResponse, setIsResponse] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fethUser(session?.user?.email);
    }
  }, [session]);

  async function redirectHome(expense: ExpenseType) {
    const institution = expense.institutions?.length && expense.institutions[0];

    const newCookies = {
      filter: {
        expense: {
          id: expense.id,
          name: expense.name,
        },
        institution: institution && {
          id: institution.id,
          name: institution.name,
        },
      },
    };

    if (institution) {
      setSelectedInstitution(institution);
      await getInstitution(institution.id);
    }

    cookies.set("expense-manager", newCookies);
    router.push("/");
  }

  function fethUser(email: string) {
    setIsResponse(true);

    getUser(email).then(() => {
      setIsResponse(false);
    });
  }

  if (isResponse) {
    return (
      <Scontainer>
        <Loading />
      </Scontainer>
    );
  }

  return (
    <Card title="Escolha um gasto para gerenciar:">
      {user?.expenses?.length ? (
        <Scontainer>
          {user.expenses.map((expense) => (
            <span
              key={expense.id}
              onClick={() => {
                redirectHome(expense);
              }}
            >
              {expense?.name}
            </span>
          ))}
        </Scontainer>
      ) : (
        <Scontainer>
          <strong>Não existe nenhum gasto vinculado ao seu email.</strong>
        </Scontainer>
      )}

      <Sbuttons>
        <Link href="/gerenciar-gasto">Cadastrar ou Editar</Link>
      </Sbuttons>
    </Card>
  );
};
