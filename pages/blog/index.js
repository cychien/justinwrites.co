import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { Client } from "@notionhq/client";

import Spacer from "components/Spacer";
import Container from "components/Container";
import PageIntro from "components/PageIntro";
import PostCard from "features/post/components/PostCard";
import PostBlock from "features/post/components/PostBlock";
import AppLayout from "layouts/AppLayout";

export default function Blog({ globalSettings, blogPageSettings, posts }) {
  const { blogName, enabledFeatures, email } = globalSettings;
  const { introduction, seoTitle, seoDescription } = blogPageSettings;

  const firstPost = posts[0];

  return (
    <div>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Spacer axis="vertical" size="24" when={{ mdAndUp: 42 }} />

      <Main>
        <Container>
          <HeroWrapper>
            <Intro>
              <PageIntro title="Blog" description={introduction[0]} dense />
            </Intro>

            <FeaturedPost>
              <Link href={`/blog/${firstPost.id}`} passHref>
                <PostLink>
                  <PostCard
                    title={firstPost.title[0]}
                    cover={firstPost.cover?.[0]}
                    excerpt={firstPost.excerpt?.[0]}
                    publishDate={firstPost.createdTime}
                    tags={firstPost?.tags}
                    priority
                  />
                </PostLink>
              </Link>
            </FeaturedPost>
          </HeroWrapper>

          <Spacer axis="vertical" size="72" when={{ smAndUp: 48 }} />
          <Divider />
          <Spacer axis="vertical" size="55" />

          {posts.length > 0 && (
            <div>
              {posts.map((data) => (
                <PostBlock
                  key={data.id}
                  id={data.id}
                  title={data.title[0]}
                  cover={data.cover?.[0]}
                  excerpt={data.excerpt?.[0]}
                  publishDate={data.createdTime}
                  tags={data?.tags}
                />
              ))}
            </div>
          )}
        </Container>
      </Main>
    </div>
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

  const blogPageSettingsId = process.env.NOTION_BLOGPAGE_SETTINGS_ID;
  const blogPageSettingsCollection = await notion.databases.query({
    database_id: blogPageSettingsId,
  });

  const blogPageSettingsRaw = blogPageSettingsCollection.results[0];

  const blogPageSettings = {
    id: blogPageSettingsRaw?.id,
    seoTitle: blogPageSettingsRaw?.properties?.seo_title?.title?.map(
      (text) => text?.text?.content
    ),
    seoDescription: blogPageSettingsRaw?.properties?.seo_description?.rich_text?.map(
      (text) => text?.text?.content
    ),
    introduction: blogPageSettingsRaw?.properties?.introduction?.rich_text?.map(
      (text) => text?.text?.content?.replace(/\n/g, "<br />")
    ),
    createdTime: blogPageSettingsRaw?.created_time,
  };

  const postsId = process.env.NOTION_POSTS_ID;
  const postsRaw = await notion.databases.query({ database_id: postsId });

  const posts = postsRaw.results
    .filter((page) => page?.properties?.name?.title.length > 0)
    .map((page) => ({
      id: page?.id,
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
    }));

  return {
    props: { globalSettings, blogPageSettings, posts },
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

const FeaturedPost = styled.div`
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

const PostLink = styled.a`
  display: block;
`;

const Divider = styled.div`
  height: 1px;
  max-width: min(300px, 33%);
  background-color: var(--gray-200);
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    & > *:first-child {
      display: none;
    }
  }

  & > *:not(:last-child) {
    margin-bottom: 24px;

    @media (min-width: 768px) {
      margin-bottom: 32px;
    }
  }
`;
