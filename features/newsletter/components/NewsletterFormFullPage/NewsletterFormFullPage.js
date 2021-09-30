import styled from "styled-components";

import Spacer from "components/Spacer";
import Stack from "components/Stack";
import Button from "components/Button";

function NewsletterFormFullPage() {
  return (
    <Wrapper>
      <Stack align="left" spacing="none">
        <Title>MONDAY ENERGY</Title>
        <Spacer axis="vertical" size="20" />
        <Description>
          <Stack spacing="xs" align="center">
            <p>
              玉山主峰山貌高峻，四面皆是陡壁危崖，南北兩側是千仞峭壁，西側絕壑深溝。
            </p>
            <p>玉山主峰山貌高峻，四面皆是陡壁危崖 西側絕壑深溝。</p>
            <p>玉山主峰山貌高峻，四面皆是陡壁危崖。</p>
          </Stack>
        </Description>
        <Spacer axis="vertical" size="32" />
        <Input placeholder="me@example.com" />
        <Spacer axis="vertical" size="26" />
        <SubscribeButton>訂閱</SubscribeButton>
      </Stack>
    </Wrapper>
  );
}

export default NewsletterFormFullPage;

const Wrapper = styled.div`
  padding: 32px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(99, 99, 99, 0.2);
  border-radius: 4px;
`;

const Title = styled.div`
  font-family: var(--font-mont);
  font-weight: 500;
  font-size: ${24 / 16}rem;
  text-align: center;
`;

const Description = styled.div`
  text-align: center;
  font-size: ${14 / 16}rem;
  color: var(--gray-500);
`;

const Input = styled.input`
  display: block;
  margin: auto;

  height: 42px;
  width: min(100%, 508px);
  padding: 10px 12px;
  border: 2px solid var(--gray-300);
  border-radius: 4px;
  font-size: ${15 / 16}rem;

  &::placeholder {
    color: var(--gray-400);
  }
`;

const SubscribeButton = styled(Button)`
  display: block;
  margin: auto;

  padding: 8px 36px;
  letter-spacing: 4%;
`;
