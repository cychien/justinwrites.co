import styled from "styled-components";

import getIconComponent from "utils/getIconComponent";
import Inline from "components/Inline";
import Spacer from "components/Spacer";

const ICON_STYLES = {
  display: "block",
  width: "20px",
  height: "20px",
  color: "var(--color)",
};

function Topic({ icon, title, description, emphasized }) {
  const IconComponent = getIconComponent(icon);

  return (
    <Wrapper>
      <Inline verticalAlign="center">
        <IconWrapper
          style={{
            "--color": emphasized ? "var(--rose-400)" : "var(--gray-500)",
          }}
        >
          <IconComponent style={ICON_STYLES} />
        </IconWrapper>
        <Title>{title}</Title>
      </Inline>
      <Spacer axis="vertical" size="6" />
      <Description>{description}</Description>
    </Wrapper>
  );
}

export default Topic;

const Wrapper = styled.div`
  padding: 16px;
  background-color: var(--gray-100);
  border-radius: 4px;

  @media (min-width: 768px) {
    padding: 0;
    background-color: revert;
    border-radius: 0;
  }
`;

const IconWrapper = styled.div`
  @media (min-width: 768px) {
    /* Because it is flex item, so no need to set inline-block */
    /* display: inline-block; */
    padding: var(--spacing-3);
    background-color: #fff;
    border: 1px solid var(--gray-200);
    border-radius: 50%;
    box-shadow: 0px 8px 24px rgba(149, 157, 165, 0.2);
  }
`;

const Title = styled.div`
  font-size: ${18 / 16}rem;
  font-weight: 600;
  color: var(--gray-600);

  /* Smaller space between icon and title in mobile */
  margin-left: -8px;

  @media (min-width: 768px) {
    margin-left: 0;
  }
`;

const Description = styled.p`
  padding: 0;
  color: var(--gray-500);

  @media (min-width: 768px) {
    // For alignment
    padding-left: 62px;
    // Because of border-box-sizing, we need adding padding
    max-width: calc(62px + 374px);
  }
`;
