import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";

import Spacer from "components/Spacer";
import Container from "components/Container";
import { Columns, Column } from "components/Columns";
import PageIntro from "components/PageIntro";
import Inline from "components/Inline";
import Stack from "components/Stack";
import PostCard from "features/post/components/PostCard";
import PostBlock from "features/post/components/PostBlock";

export default function Blog() {
  return (
    <div>
      <Head>
        {/* TODO: Use real data */}
        <title>Blog</title>
        <meta name="description" content="Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Container>
          <Columns>
            <Column>
              <PageIntro
                title="Blog"
                description="玉山主峰山貌高峻，四面皆是陡壁危崖，南北兩側是千仞峭壁，西側絕壑深溝，東側則是碎石陡坡。玉山無論山容或山勢皆在台灣為最具規模，除了是台灣五岳之首、百岳之王外，更重要的是玉山群峰地區蘊含著珍貴的生命寶藏。這裡有亞熱帶、暖溫帶"
                dense
              />
            </Column>
            <Column hideWhenBelow="md">
              <Inline align="center">
                <PostCard imageSrc="https://picsum.photos/200/300" />
              </Inline>
            </Column>
          </Columns>

          <Spacer axis="vertical" size="72" when={{ smAndUp: 48 }} />
          <Divider />
          <Spacer axis="vertical" size="55" />

          <Flex>
            <PostBlock />
            <PostBlock />
          </Flex>
        </Container>
      </Main>
    </div>
  );
}

const Divider = styled.div`
  height: 1px;
  width: 33%;
  background-color: var(--gray-200);

  @media (min-width: 576px) {
    width: 50%;
  }
`;

const Main = styled.main`
  margin-bottom: 80px;

  @media (min-width: 576px) {
    margin-bottom: 120px;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: 28px;

    @media (min-width: 576px) {
      margin-bottom: 32px;
    }
  }
`;
