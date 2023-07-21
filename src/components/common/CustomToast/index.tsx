import React from "react";
import { toast, ToastOptions } from "react-toastify";

export const customToast = async (
  functionThatReturnPromise: () => Promise<any>,
  messageLoading = "Processando! ⏳",
  messageSucesso = "Sucesso! 👌",
  messageError = "Tente novamente mais tarde! 🤯",
  toastOptions: ToastOptions = {}
): Promise<void> => {
  const loadingToastId = toast.info(<h3>{messageLoading}</h3>, toastOptions);

  try {
    await functionThatReturnPromise();
    toast.update(loadingToastId, {
      render: <h3>{messageSucesso}</h3>,
      type: toast.TYPE.SUCCESS,
    });
  } catch (error) {
    toast.update(loadingToastId, {
      render: <h3>{messageError}</h3>,
      type: toast.TYPE.ERROR,
    });
    throw error;
  }
};

// Exemplo de como usar a função customToast
const SomeComponent: React.FC = () => {
  const handleUpdateShopping = async () => {
    try {
      await customToast(
        async () => {
          // Simula uma operação assíncrona, como uma chamada de API
          await new Promise((resolve) => setTimeout(resolve, 2000));
        },
        "Processando! ⏳ Aguarde...",
        "Sucesso! 👌",
        "Tente novamente mais tarde! 🤯",
        {
          // Opções personalizadas para o toast, se necessário
          position: toast.POSITION.TOP_CENTER,
        }
      );

      // O código aqui será executado após o customToast ser concluído com sucesso
    } catch (error) {
      // O código aqui será executado se ocorrer um erro durante a operação customToast
    }
  };

  return (
    <div>
      <button onClick={handleUpdateShopping}>Atualizar Carrinho</button>
    </div>
  );
};

export default SomeComponent;
