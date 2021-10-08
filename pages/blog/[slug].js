import { useMemo } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Client } from "@notionhq/client";
import format from "date-fns/format";
import Highlight, { defaultProps } from "prism-react-renderer";
import github from "prism-react-renderer/themes/nightOwl";

import Container from "components/Container";
import Spacer from "components/Spacer";
import { hasAnnotation, getTableOfContent, hasLink } from "utils/notion";
import AppLayout from "layouts/AppLayout";

export default function Post({ globalSettings, pageData }) {
  const { blogName, enabledFeatures, email } = globalSettings;

  const router = useRouter();

  const tableOfContent = getTableOfContent(pageData.blocks);

  const publishDate = pageData.createdTime;

  const formattedPublishDate = useMemo(
    () => format(new Date(publishDate), "MMM.dd"),
    [publishDate]
  );

  return (
    <AppLayout
      blogName={blogName[0]}
      enabledFeatures={enabledFeatures}
      email={email[0]}
    >
      <Head>
        <title>{pageData.title[0]}</title>
        <meta name="description" content={pageData.excerpt[0]} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Spacer axis="vertical" size="0" when={{ mdAndUp: 42 }} />

      <Main>
        <Container>
          <HeroWrapper>
            <Heading>
              <HeadingInner>
                {pageData.tags.length > 0 && (
                  <>
                    <Tag>{pageData.tags[0].name}</Tag>
                    <Spacer axis="vertical" size="6" when={{ mdAndUp: 12 }} />
                  </>
                )}
                <Title>{pageData.title[0]}</Title>
                <Spacer axis="vertical" size="6" when={{ mdAndUp: 12 }} />
                <PublishDate>{formattedPublishDate}</PublishDate>
              </HeadingInner>
            </Heading>
            <Cover>
              {pageData.cover?.[0] && (
                <ImageWrapper>
                  <Image
                    src={pageData.cover?.[0]}
                    layout="fill"
                    objectFit="cover"
                    alt="Post Image"
                    priority
                  />
                </ImageWrapper>
              )}
            </Cover>
          </HeroWrapper>

          <Divider />

          <Spacer axis="vertical" size="8" when={{ mdAndUp: 74 }} />

          <ArticleWrapper>
            <PostBody>
              {pageData.blocks.map((block) => {
                const content = block[block.type]?.text
                  ?.map((t) =>
                    hasAnnotation(t)
                      ? hasLink
                        ? `<a href=${t?.href} target='_blank'>${t?.text?.content}</a>`
                        : `<strong>${t?.text?.content}</strong>`
                      : t?.text?.content
                  )
                  ?.join("");

                if (block.type === "heading_2") {
                  return (
                    <Heading2
                      id={encodeURIComponent(content)}
                      dangerouslySetInnerHTML={{ __html: content }}
                      key={block.id}
                    />
                  );
                }

                if (block.type === "heading_3") {
                  return (
                    <Heading3
                      id={encodeURIComponent(content)}
                      dangerouslySetInnerHTML={{ __html: content }}
                      key={block.id}
                    />
                  );
                }

                if (block.type === "paragraph" && content) {
                  return (
                    <Paragraph
                      dangerouslySetInnerHTML={{ __html: content }}
                      key={block.id}
                    />
                  );
                }

                if (
                  block.type === "image" &&
                  block[block.type]?.external?.url?.includes("http")
                ) {
                  return (
                    <BodyImageWrapper key={block.id}>
                      <Image
                        src={block[block.type]?.external?.url}
                        layout="fill"
                        alt="image"
                        priority
                      />
                    </BodyImageWrapper>
                  );
                }

                if (block.type === "code") {
                  const language = block[block.type]?.language;
                  const content = block[block.type]?.text?.[0]?.text?.content;

                  return (
                    <Highlight
                      {...defaultProps}
                      theme={github}
                      code={content}
                      language={language === "plain text" ? "jsx" : language}
                      key={block.id}
                    >
                      {({
                        className,
                        style,
                        tokens,
                        getLineProps,
                        getTokenProps,
                      }) => (
                        <pre
                          className={className}
                          style={{
                            ...style,
                            padding: "20px",
                            fontFamily: "monospace",
                            fontSize: "16px",
                            borderRadius: "8px",
                            margin: "24px 0",
                            overflowX: "auto",
                          }}
                        >
                          {tokens.map((line, i) => (
                            <div key={i} {...getLineProps({ line, key: i })}>
                              {line.map((token, key) => (
                                <span
                                  key={key}
                                  {...getTokenProps({ token, key })}
                                />
                              ))}
                            </div>
                          ))}
                        </pre>
                      )}
                    </Highlight>
                  );
                }

                if (block.type === "bulleted_list_item") {
                  return (
                    <BulletListItem
                      dangerouslySetInnerHTML={{ __html: content }}
                      key={block.id}
                    />
                  );
                }

                if (block.type === "unsupported") {
                  return <Hr key={block.id} />;
                }
              })}
            </PostBody>
            {tableOfContent.length > 0 && (
              <TableOfContent>
                <nav>
                  <TableOfContentTitle>目錄</TableOfContentTitle>
                  <Spacer axis="vertical" size="18" />
                  {tableOfContent.map((heading, index) => (
                    <Link
                      href={`${router.pathname.replace(
                        "[slug]",
                        pageData.id
                      )}#${heading}`}
                      passHref
                      key={index}
                    >
                      <TableOfContentLink>{heading}</TableOfContentLink>
                    </Link>
                  ))}
                </nav>
              </TableOfContent>
            )}
          </ArticleWrapper>
        </Container>
      </Main>
    </AppLayout>
  );
}

export async function getStaticPaths() {
  const notion = new Client({ auth: process.env.NOTION_SECRET });
  const databaseId = process.env.NOTION_POSTS_ID;
  const pages = await notion.databases.query({ database_id: databaseId });
  const pageIds = pages.results.map((page) => page.id);

  return {
    paths: pageIds.map((id) => ({ params: { slug: id } })),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const notion = new Client({ auth: process.env.NOTION_SECRET });
  const pageId = context.params.slug;

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

  const page = await notion.pages.retrieve({ page_id: pageId });
  const blocks = await notion.blocks.children.list({ block_id: pageId });

  const pageData = {
    id: pageId,
    title: page?.properties?.name?.title?.map((text) => text?.text?.content),
    cover: page?.properties?.cover?.files?.map(
      (file) => file?.external?.url || file?.file?.url
    ),
    excerpt: page?.properties?.excerpt?.rich_text?.map(
      (text) => text?.text?.content
    ),
    tags: page?.properties?.tags.multi_select?.map((tag) => ({
      id: tag?.id,
      name: tag?.name,
    })),
    createdTime: page?.created_time,
    blocks: blocks.results,
  };

  return {
    props: { globalSettings, pageData },
    revalidate: 1,
  };
}

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
  font-weight: 600;
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
  line-height: 1.7rem;
  color: var(--gray-700);
`;

const TableOfContent = styled.aside`
  position: sticky;
  top: ${68 + 60}px;
  align-self: flex-start;

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

const Paragraph = styled.p`
  margin: 20px 0;

  & a {
    padding: 0 4px;
    font-weight: 600;
    text-decoration: underline;

    &:hover {
      color: var(--teal-600);
    }
  }
`;

const Heading2 = styled.h2`
  font-weight: 600;
  margin: 48px 0 24px;
  font-size: ${24 / 16}rem;
  color: var(--gray-900);
`;

const Heading3 = styled.h3`
  font-weight: 600;
  margin: 32px 0 12px;
  font-size: ${20 / 16}rem;
  color: var(--gray-900);
`;

const BodyImageWrapper = styled.div`
  margin: 48px 0;
  width: 100%;

  & > div {
    position: unset !important;
  }

  & img {
    object-fit: contain;
    width: 100% !important;
    position: relative !important;
    height: unset !important;
  }
`;

const BulletListItem = styled.div`
  position: relative;
  padding-left: 28px;
  margin: 8px 0;

  &::before {
    content: "";
    position: absolute;
    background-color: #d1d5db;
    border-radius: 50%;
    width: 0.375em;
    height: 0.375em;
    top: calc(0.875em - 0.1875em);
    left: 0.25em;
  }

  & a {
    padding: 0 4px;
    font-weight: 600;
    text-decoration: underline;

    &:hover {
      color: var(--teal-600);
    }
  }
`;

const Hr = styled.hr`
  height: 0;
  border: 0 solid #e5e7eb;

  border-top-color: #e5e7eb;
  border-top-width: 1px;
  margin-top: 3rem;
  margin-bottom: 3rem;
`;
