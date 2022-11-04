import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import GlobalStyle from "../styles/globalStyle";
import Theme from "src/styles/theme";
import UserContextProvider from "src/context/userContext";

function MyApp({ Component, pageProps }: AppProps) {
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
        <Component {...pageProps} />
      </Theme>
    </UserContextProvider>
  );
}

export default MyApp;
