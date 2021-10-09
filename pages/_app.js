import AppLayout from "layouts/AppLayout";
import GlobalStyle from "layouts/AppLayout/GlobalStyle";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
