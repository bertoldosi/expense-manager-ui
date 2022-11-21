import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import GlobalStyle from "../styles/globalStyle";
import Theme from "src/styles/theme";
import UserContextProvider from "src/context/userContext";
import Layout from "@commons/Layout";
import { Page } from "page";

type Props = AppProps & {
  Component: Page;
};

function MyApp({ Component, pageProps }: Props) {
  const AppLayout = Component.layout || Layout;

  return (
    <UserContextProvider>
      <Theme>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <GlobalStyle />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </Theme>
    </UserContextProvider>
  );
}

export default MyApp;
