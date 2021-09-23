import GlobalStyle from "./GlobalStyle";

function AppLayout({ children }) {
  return (
    <>
      <GlobalStyle />
      {children}
    </>
  );
}

export default AppLayout;
