import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import GlobalStyle from "../styles/globalStyle";
import Theme from "src/styles/theme";
import UserContextProvider from "src/context/userContextConfig";
import Layout from "@commons/Layout";
import { Page } from "page";
import { Wrapped } from "@commons/Wrapped";
import UserAppContextProvider from "src/context/userContextData";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const AppLayout = Component.layout || Layout;

  return (
    <SessionProvider session={session}>
      <UserContextProvider>
        <UserAppContextProvider>
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
              <Wrapped>
                <Component {...pageProps} />
              </Wrapped>
            </AppLayout>
          </Theme>
        </UserAppContextProvider>
      </UserContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
