import styled from "styled-components";

import GlobalStyle from "./GlobalStyle";
import Header from "./Header";
import Spacer from "components/Spacer";
import Footer from "./Footer";

function AppLayout({ children }) {
  return (
    <Wrapper>
      <GlobalStyle />
      <Spacer axis="vertical" size="16" when={{ mdAndUp: "36" }} />
      <Header />
      <Spacer axis="vertical" size="48" />
      {children}
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </Wrapper>
  );
}

export default AppLayout;

const Wrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const FooterWrapper = styled.div`
  margin-top: auto;
`;
