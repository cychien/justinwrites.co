import { useMemo } from "react";
import styled from "styled-components";
import Image from "next/image";
import TagIcon from "@heroicons/react/solid/TagIcon";
import HeartIcon from "@heroicons/react/outline/HeartIcon";
import format from "date-fns/format";
import Link from "next/link";

import Inline from "components/Inline";
import Spacer from "components/Spacer";

function PostBlock({ id, title, cover, excerpt, publishDate, tags }) {
  const formattedPublishDate = useMemo(
    () => format(new Date(publishDate), "MMM.dd"),
    [publishDate]
  );

  return (
    <Wrapper>
      <Link href={`/blog/${id}`} passHref>
        <PostLink>
          <Flex>
            <ImageWrapper>
              {cover ? (
                <Image
                  src={cover}
                  layout="fill"
                  objectFit="cover"
                  alt="Post Image"
                />
              ) : (
                <ImagePlaceholder />
              )}
            </ImageWrapper>

            <ContentWrapper>
              <Title>{title}</Title>
              {excerpt && (
                <>
                  <Spacer axis="vertical" size="4" when={{ mdAndUp: 12 }} />
                  <Excerpt>{excerpt}</Excerpt>
                </>
              )}
              <Spacer axis="vertical" size="0" when={{ mdAndUp: 4 }} />
              <Metadata>
                <Inline verticalAlign="center">
                  <span>{formattedPublishDate}</span>
                  {tags.length > 0 && (
                    <Flex>
                      <TagIconElem />
                      <Spacer axis="horizontal" size={2} />
                      <span>{tags[0].name}</span>
                    </Flex>
                  )}
                </Inline>
              </Metadata>
            </ContentWrapper>
          </Flex>

          {/* <Operations>
        <LikeIcon />
      </Operations> */}
          {/* <ReadMore>讀更多</ReadMore> */}
        </PostLink>
      </Link>
    </Wrapper>
  );
}

export default PostBlock;

const Wrapper = styled.article`
  display: flex;
  justify-content: space-between;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 88px;
  height: 88px;
  margin-right: 12px;

  @media (min-width: 768px) {
    width: 237px;
    height: 168px;
    margin-right: 24px;
  }

  & > div {
    border-radius: 5px;

    @media (min-width: 768px) {
      border-radius: 10px;
    }
  }
`;

const ImagePlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  background-color: var(--sky-50);
  border: 1px solid var(--sky-100);
`;

const ContentWrapper = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const Title = styled.h3`
  color: var(--gray-700);
  font-weight: 600;

  transition: color 150ms;

  a:hover & {
    color: var(--teal-600);
  }

  @media (min-width: 768px) {
    font-size: ${18 / 16}rem;
  }
`;

const Excerpt = styled.p`
  display: none;
  color: var(--gray-500);

  @media (min-width: 768px) {
    display: block;
    line-height: 1.7;
  }
`;

const Metadata = styled.div`
  color: var(--gray-400);
  font-size: ${14 / 16}rem;
`;

const TagIconElem = styled(TagIcon)`
  width: 16px;
  height: 16px;
  color: var(--gray-400);
  display: block;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const ReadMore = styled.div`
  will-change: transform, opacity;
  transform: translateY(30px);
  opacity: 0;
  color: var(--teal-600);

  transition: transform 300ms, opacity 300ms;

  ${Wrapper}:hover & {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Operations = styled.div`
  padding-top: 12px;
`;

const LikeIcon = styled(HeartIcon)`
  display: block;
  color: var(--gray-400);
  width: 20px;
  height: 20px;
`;

const PostLink = styled.a`
  display: block;
  width: 100%;
`;
