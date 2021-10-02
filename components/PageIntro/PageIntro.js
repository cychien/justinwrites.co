import styled from "styled-components";

import Stack from "components/Stack";

function PageIntro({ title, description, dense }) {
  return (
    <Wrapper>
      <Stack spacing={dense ? "mdp" : "lg"}>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
      </Stack>
    </Wrapper>
  );
}

export default PageIntro;

const Wrapper = styled.div`
  @media (min-width: 768px) {
    max-width: 440px;
  }
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: ${36 / 16}rem;
`;

const Description = styled.div`
  color: var(--gray-500);

  & > p:not(:last-child) {
    margin-bottom: var(--spacing-6);
  }
`;
