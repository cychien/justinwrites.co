import { useMemo, useEffect, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import TagIcon from "@heroicons/react/solid/TagIcon";
import format from "date-fns/format";
import { animate } from "motion";

import Stack from "components/Stack";
import Inline from "components/Inline";
import Spacer from "components/Spacer";

function PostCard({ title, excerpt, publishDate, cover, tags, priority }) {
  const formattedPublishDate = useMemo(
    () => format(new Date(publishDate), "MMM.dd"),
    [publishDate]
  );

  const card1Ref = useRef();
  const card2Ref = useRef();

  useEffect(() => {
    animate(
      card1Ref.current,
      {
        rotate: -3,
        x: -8,
        filter: "drop-shadow(0px 2px 8px rgba(99, 99, 99, 0.2))",
      },
      { delay: 0.5, duration: 0.4, easing: "ease-out" }
    );
  }, []);

  useEffect(() => {
    animate(
      card2Ref.current,
      {
        rotate: 3,
        x: 5,
        y: 8,
        filter: "drop-shadow(0px 2px 8px rgba(99, 99, 99, 0.2))",
      },
      { delay: 1, duration: 0.8, easing: "ease-out" }
    );
  }, []);

  return (
    <Wrapper>
      <Stack spacing="smp">
        <ImageWrapper>
          {cover ? (
            <Image
              src={cover}
              layout="fill"
              objectFit="cover"
              alt="Post Image"
              priority={!!priority}
            />
          ) : (
            <ImagePlaceholder />
          )}
        </ImageWrapper>
        <Title>{title}</Title>
        {excerpt && <Excerpt>{excerpt}</Excerpt>}
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
      </Stack>
      <Card1 ref={card1Ref} />
      <Card2 ref={card2Ref} />
    </Wrapper>
  );
}

export default PostCard;

const Wrapper = styled.article`
  position: relative;

  background-color: #ffffff;
  padding: 13px;
  padding-bottom: 24px;
  box-shadow: 0px 2px 8px rgba(99, 99, 99, 0.2);

  transition: box-shadow 150ms;

  &:hover {
    box-shadow: 0px 2px 16px rgba(99, 99, 99, 0.6);
  }

  @media (min-width: 768px) {
    width: ${270 + 13 * 2}px;
  }

  @media (min-width: 992px) {
    width: ${340 + 13 * 2}px;
  }
`;

const Card1 = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #fff;
  border: 1px solid var(--gray-100);

  right: 0;
  top: 0;
  z-index: -1;
`;

const Card2 = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #fff;
  border: 1px solid var(--gray-100);

  right: 0;
  top: 0;
  z-index: -2;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;

  @media (min-width: 768px) {
    height: 180px;
  }

  @media (min-width: 992px) {
    height: 212px;
  }

  & > div {
    border-radius: 2px;
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

const Title = styled.h3`
  font-weight: 600;
  color: var(--gray-700);

  transition: color 150ms;

  ${Wrapper}:hover & {
    color: var(--teal-600);
  }
`;

const Excerpt = styled.p`
  color: var(--gray-500);
  font-size: ${14 / 16}rem;
  line-height: 1.7;
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
