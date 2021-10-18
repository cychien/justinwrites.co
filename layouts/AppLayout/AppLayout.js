import styled from "styled-components";

import Header from "./Header";
import Spacer from "components/Spacer";
import Footer from "./Footer";

function AppLayout({ children, blogName, enabledFeatures, email }) {
  return (
    <Wrapper>
      <Spacer axis="vertical" size="0" when={{ mdAndUp: "16" }} />
      <Header blogName={blogName} enabledFeatures={enabledFeatures} />
      <Spacer axis="vertical" size="24" when={{ mdAndUp: "40" }} />
      {children}
      <FooterWrapper>
        <Footer
          blogName={blogName}
          enabledFeatures={enabledFeatures}
          email={email}
        />
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
