import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

import GlobalStyle from "../styles/globalStyle";
import Theme from "src/styles/theme";

import Layout from "@components/Layout";
import { Wrapped } from "@components/Wrapped";
import UserContextProvider from "@context/userContextConfig";
import UserAppContextProvider from "@context/userContextData";

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
