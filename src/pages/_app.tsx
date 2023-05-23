import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import GlobalStyle from "../styles/globalStyle";
import Theme from "src/styles/theme";
import UserContextProvider from "src/context/userContextConfig";
import Layout from "@commons/Layout";
import { Page } from "page";
import { Wrapped } from "@commons/Wrapped";
import { GoogleOAuthProvider } from "@react-oauth/google";
import getConfig from "next/config";
import UserAppContextProvider from "src/context/userAppContextData";
const { publicRuntimeConfig = {} } = getConfig() || {};

type Props = AppProps & {
  Component: Page;
};

const CLIENT_ID = publicRuntimeConfig.CLIENT_ID;

function MyApp({ Component, pageProps }: Props) {
  const AppLayout = Component.layout || Layout;

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
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
    </GoogleOAuthProvider>
  );
}

export default MyApp;
