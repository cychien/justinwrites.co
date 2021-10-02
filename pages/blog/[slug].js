import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import Container from "components/Container";
import Spacer from "components/Spacer";

function Post() {
  return (
    <div>
      <Head>
        {/* TODO: Use real data */}
        <title>Blog</title>
        <meta name="description" content="Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Spacer axis="vertical" size="0" when={{ mdAndUp: 50 }} />

      <Main>
        <Container>
          <HeroWrapper>
            <Heading>
              <HeadingInner>
                <Tag>人生體悟</Tag>
                <Spacer axis="vertical" size="6" when={{ mdAndUp: 12 }} />
                <Title>如果把我們的人生看成一場故事</Title>
                <Spacer axis="vertical" size="6" when={{ mdAndUp: 12 }} />
                <PublishDate>Oct.10</PublishDate>
              </HeadingInner>
            </Heading>
            <Cover>
              <ImageWrapper>
                <Image
                  src="https://picsum.photos/600/1200"
                  layout="fill"
                  objectFit="cover"
                  alt="Post Image"
                  priority
                />
              </ImageWrapper>
            </Cover>
          </HeroWrapper>

          <Divider />

          <Spacer axis="vertical" size="8" when={{ mdAndUp: 74 }} />

          <ArticleWrapper>
            <PostBody>
              玉山主峰山貌高峻，四面皆是陡壁危崖，南北兩側是千仞峭壁，西側絕壑深溝，東側則是碎石陡坡。玉山無論山容或山勢皆在台灣為最具規模，除了是台灣五岳之首
            </PostBody>
            <TableOfContent>
              <nav>
                <TableOfContentTitle>目錄</TableOfContentTitle>
                <Spacer axis="vertical" size="18" />
                <Link href="/" passHref>
                  <TableOfContentLink>玉山主峰山貌高峻</TableOfContentLink>
                </Link>
                <Link href="/" passHref>
                  <TableOfContentLink>玉山主峰山</TableOfContentLink>
                </Link>
                <Link href="/" passHref>
                  <TableOfContentLink>玉山主峰山貌高</TableOfContentLink>
                </Link>
              </nav>
            </TableOfContent>
          </ArticleWrapper>
        </Container>
      </Main>
    </div>
  );
}

export default Post;

const Main = styled.main`
  margin-bottom: 80px;

  @media (min-width: 576px) {
    margin-bottom: 250px;
  }
`;

const HeroWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Heading = styled.div`
  padding: 32px 0 20px;
  flex: 1;

  @media (min-width: 768px) {
    margin-right: 40px;
  }

  @media (min-width: 992px) {
    margin-right: 90px;
  }
`;

const HeadingInner = styled.div`
  max-width: 400px;
`;

const Title = styled.h1`
  font-size: ${32 / 16}rem;
  line-height: 1.3333;

  @media (min-width: 992px) {
    font-size: ${36 / 16}rem;
  }
`;

const Tag = styled.div`
  color: var(--teal-500);
  font-weight: 600;
`;

const PublishDate = styled.div`
  color: var(--gray-400);
`;

const Cover = styled.div`
  flex: 1;
`;

const ImageWrapper = styled.div`
  position: relative;
  margin-left: -16px;
  margin-right: -16px;
  width: calc(100% + 32px);
  height: 260px;

  @media (min-width: 576px) {
    width: 100%;
    margin: 0;
  }

  @media (min-width: 992px) {
    width: 100%;
    margin: 0;
    height: 300px;
  }

  & > div {
    border-radius: 0px;

    @media (min-width: 768px) {
      border-radius: 4px;
    }
  }
`;

const Divider = styled.div`
  height: 1px;
  max-width: min(300px, 33%);
  background-color: var(--gray-200);
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

const ArticleWrapper = styled.div`
  display: flex;
`;

const PostBody = styled.article`
  padding: 20px 0;
  max-width: min(686px, 100%);
  line-height: 1.7;
`;

const TableOfContent = styled.aside`
  margin-left: auto;
  flex: 0 10000 250px;
  color: var(--gray-500);
  display: none;

  @media (min-width: 992px) {
    display: block;
  }
`;

const TableOfContentTitle = styled.h2`
  font-size: ${20 / 16}rem;
  color: var(--gray-500);
`;

const TableOfContentLink = styled.a`
  display: block;
  color: var(--gray-500);
  font-size: ${14 / 16}rem;

  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;
