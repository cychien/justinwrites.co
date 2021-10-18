import { useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { Client } from "@notionhq/client";
import ArrowNarrowRightIcon from "@heroicons/react/outline/ArrowNarrowRightIcon";
import { animate } from "motion";

import Inline from "components/Inline";
import Spacer from "components/Spacer";
import Button from "components/Button";
import ShiftBy from "components/ShiftBy";
import Container from "components/Container";
import PageIntro from "components/PageIntro";
import Topic from "features/homepage/components/Topic";
import NewsletterFormFullPage from "features/newsletter/components/NewsletterFormFullPage";
import AppLayout from "layouts/AppLayout";

export default function Home({ globalSettings, homepageSettings }) {
  const { blogName, enabledFeatures, email } = globalSettings;
  const {
    greeting,
    introduction,
    cover,
    seoTitle,
    seoDescription,
    topics,
  } = homepageSettings;

  const imageRef = useRef();

  useEffect(() => {
    animate(
      imageRef.current,
      { transform: "translate(0, 0)" },
      { delay: 0.5, duration: 0.7, easing: "ease-out" }
    );
  }, []);

  return (
    <AppLayout
      blogName={blogName[0]}
      enabledFeatures={enabledFeatures}
      email={email[0]}
    >
      <Head>
        <title>{seoTitle[0]}</title>
        <meta name="description" content={seoDescription[0]} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Container>
          {/* Hero section */}
          <Section>
            <HeroWrapper>
              <Intro>
                <PageIntro title={greeting[0]} description={introduction[0]} />
              </Intro>
              <Cover>
                <ImageWrapper>
                  <ImageElement ref={imageRef}>
                    <Image
                      src={cover[0]}
                      layout="fill"
                      objectFit="cover"
                      alt="Picture of me"
                      priority
                    />
                  </ImageElement>
                  <ImageShadow />
                </ImageWrapper>
              </Cover>
            </HeroWrapper>
          </Section>

          {/* Topic section */}
          <Section>
            <Inline align="spaceBetween" verticalAlign="center">
              <SectionTitle>我喜歡寫作，特別是這些主題</SectionTitle>
              <Link href="/blog" passHref>
                <GoTo>
                  <Button>
                    <Inline spacing="xs">
                      前往閱讀
                      <ShiftBy y={2}>
                        <GoToIcon />
                      </ShiftBy>
                    </Inline>
                  </Button>
                </GoTo>
              </Link>
            </Inline>
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
          {enabledFeatures.includes("newsletter") && (
            <Section>
              <SectionTitle>
                如果喜歡我的內容, 訂閱 <strong>MONDAY ENERGY</strong> 看更多 !
              </SectionTitle>
              <Spacer axis="vertical" size="36" />
              <NewsletterFormFullPage />
            </Section>
          )}
        </Container>
      </Main>
    </AppLayout>
  );
}

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_SECRET });

  const globalSettingsId = process.env.NOTION_GLOBAL_SETTINGS_ID;
  const globalSettingsCollection = await notion.databases.query({
    database_id: globalSettingsId,
  });

  const globalSettingsRaw = globalSettingsCollection.results[0];

  const globalSettings = {
    id: globalSettingsRaw?.id,
    blogName: globalSettingsRaw?.properties?.blog_name?.title?.map(
      (text) => text?.text?.content
    ),
    enabledFeatures: globalSettingsRaw?.properties?.enabled_features.multi_select?.map(
      (feature) => feature?.name
    ),
    email: globalSettingsRaw?.properties?.email?.rich_text?.map(
      (text) => text?.text?.content
    ),
    createdTime: globalSettingsRaw?.created_time,
  };

  const homepageSettingsId = process.env.NOTION_HOMEPAGE_SETTINGS_ID;
  const homepageSettingsCollection = await notion.databases.query({
    database_id: homepageSettingsId,
  });

  const homepageSettingsRaw = homepageSettingsCollection.results[0];

  const topics = [];

  for (const [key, value] of Object.entries(homepageSettingsRaw?.properties)) {
    if (key.includes("topic")) {
      const topicIndex = key.split(":")[1];
      const content = value?.rich_text
        ?.map((text) => text?.text?.content)[0]
        .split(":");

      topics[topicIndex] = {
        icon: content[0],
        title: content[1],
        description: content[2],
        emphasized: !!content[3],
      };
    }
  }

  const homepageSettings = {
    id: homepageSettingsRaw?.id,
    seoTitle: homepageSettingsRaw?.properties?.seo_title?.title?.map(
      (text) => text?.text?.content
    ),
    seoDescription: homepageSettingsRaw?.properties?.seo_description?.rich_text?.map(
      (text) => text?.text?.content
    ),
    greeting: homepageSettingsRaw?.properties?.greeting?.rich_text?.map(
      (text) => text?.text?.content
    ),
    introduction: homepageSettingsRaw?.properties?.introduction?.rich_text?.map(
      (text) => text?.text?.content?.replace(/\n/g, "<br />")
    ),
    cover: homepageSettingsRaw?.properties?.cover?.files?.map(
      (file) => file?.external?.url || file?.file?.url
    ),
    createdTime: homepageSettingsRaw?.created_time,
    topics,
  };

  return {
    props: { globalSettings, homepageSettings },
    revalidate: 1,
  };
}

const Main = styled.main`
  margin-bottom: 80px;

  @media (min-width: 576px) {
    margin-bottom: 120px;
  }
`;

const HeroWrapper = styled.div`
  display: flex;
`;

const Intro = styled.div`
  flex: 1;

  @media (min-width: 992px) {
    padding-top: 48px;
  }
`;

const Cover = styled.div`
  display: none;

  @media (min-width: 768px) {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  @media (min-width: 992px) {
    flex: 1;
    display: flex;
    justify-content: center;
  }
`;

const ImageWrapper = styled.div`
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

const ImageElement = styled.div`
  width: 100%;
  height: 100%;

  @media (min-width: 768px) {
    transform: translate(12px, 10px);
  }

  & > div {
    border-radius: 4px;
  }
`;

const ImageShadow = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;
  background-color: var(--gray-200);
  border-radius: 4px;
  z-index: -1;

  @media (min-width: 768px) {
    top: 10px;
    left: 12px;
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

    @media (min-width: 768px) {
      margin-bottom: 120px;
    }
  }
`;

const GoTo = styled.a``;

const GoToIcon = styled(ArrowNarrowRightIcon)`
  display: block;
  opacity: 0.5;
  width: 24px;
  height: 24px;

  transition: transform 300ms, opacity 300ms;

  ${GoTo}:hover & {
    opacity: 1;
    will-change: transform;
    transform: translateX(6px);
  }
`;
