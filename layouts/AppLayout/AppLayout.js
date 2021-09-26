import GlobalStyle from "./GlobalStyle";
import Header from "./Header";
import Spacer from "components/Spacer";

function AppLayout({ children }) {
  return (
    <>
      <GlobalStyle />
      <Spacer axis="vertical" size="16" when={{ mdAndUp: "36" }} />
      <Header />
      <Spacer axis="vertical" size="48" />
      {children}
    </>
  );
}

export default AppLayout;
