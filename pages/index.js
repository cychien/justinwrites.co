import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";

import Spacer from "components/Spacer";
import Container from "components/Container";
import { Columns, Column } from "components/Columns";
import Inline from "components/Inline";
import PageIntro from "components/PageIntro";
import Topic from "features/homepage/components/Topic";
import topics from "constants/topics";
import NewsletterFormFullPage from "features/newsletter/components/NewsletterFormFullPage";

export default function Home() {
  return (
    <div>
      <Head>
        {/* TODO: Use real data */}
        <title>Home</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Spacer axis="vertical" size="0" when={{ mdAndUp: "46" }} />

      <Main>
        <Container>
          {/* Hero section */}
          <Section>
            <Columns verticalAlgin="center">
              <Column>
                <PageIntro
                  title="Hi, I am Justin"
                  description="玉山主峰山貌高峻，四面皆是陡壁危崖，南北兩側是千仞峭壁，西側絕壑深溝，東側則是碎石陡坡。玉山無論山容或山勢皆在台灣為最具規模，除了是台灣五岳之首、百岳之王外，更重要的是玉山群峰地區蘊含著珍貴的生命寶藏。這裡有亞熱帶、暖溫帶。 玉山主峰山貌高峻，四面皆是陡壁危崖，南北兩側是千仞峭壁，西側絕壑深溝，東側則是碎石陡坡。玉山無論山容或山勢皆在台灣為最具規模，除了是台灣五岳之首、百岳之王外。"
                />
              </Column>
              <Column hideWhenBelow="md">
                <Inline align="center">
                  {/* Make it responsive */}
                  <PictureOfMeWrapper>
                    <Image
                      src="https://picsum.photos/200/300"
                      layout="fill"
                      objectFit="cover"
                      alt="Picture of me"
                      priority
                    />
                  </PictureOfMeWrapper>
                </Inline>
              </Column>
            </Columns>
          </Section>

          {/* Topic section */}
          <Section>
            <SectionTitle>在這裡，我想和你分享...</SectionTitle>
            <Spacer axis="vertical" size="26" when={{ mdAndUp: "40" }} />
            <Topics>
              {topics.map((topic) => (
                <Topic
                  icon={topic.icon}
                  title={topic.title}
                  description={topic.description}
                  emphasized={topic.emphasized}
                  key={topic.title}
                />
              ))}
            </Topics>
          </Section>

          {/* Newsletter section */}
          <Section>
            <SectionTitle>
              如果喜歡我的內容, 訂閱 <strong>MONDAY ENERGY</strong> 看更多 !
            </SectionTitle>
            <Spacer axis="vertical" size="36" />
            <NewsletterFormFullPage />
          </Section>
        </Container>
      </Main>
    </div>
  );
}

const Main = styled.main`
  margin-bottom: 80px;

  @media (min-width: 576px) {
    margin-bottom: 120px;
  }
`;

const PictureOfMeWrapper = styled.div`
  position: relative;

  @media (min-width: 768px) {
    width: 280px;
    height: 320px;
  }

  @media (min-width: 992px) {
    width: 378px;
    height: 434px;
  }
`;

const SectionTitle = styled.h2`
  font-size: ${24 / 16}rem;

  & strong {
    // In order to show bottom line
    display: inline-block;
    position: relative;
    font-weight: 600;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 6px;

      width: 100%;
      height: 8px;
      background-color: var(--teal-500);
      opacity: 30%;
    }
  }
`;

const Topics = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px 8px;
  }
`;

const Section = styled.section`
  &:not(:last-child) {
    margin-bottom: 80px;

    @media (min-width: 576px) {
      margin-bottom: 120px;
    }
  }
`;
