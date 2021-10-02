import styled from "styled-components";
import Image from "next/image";
import TagIcon from "@heroicons/react/solid/TagIcon";

import Stack from "components/Stack";
import Inline from "components/Inline";
import Spacer from "components/Spacer";

function PostCard({ imageSrc, title, excerpt, publishDate, tags }) {
  return (
    <Wrapper>
      <Stack spacing="smp">
        <ImageWrapper>
          <Image
            src={imageSrc}
            layout="fill"
            objectFit="cover"
            alt="Post Image"
            priority
          />
        </ImageWrapper>
        <Title>如果把我們的人生看成一場故事</Title>
        <Excerpt>
          玉山主峰山貌高峻，四面皆是陡壁危崖，南北兩側是千仞峭壁，西側絕壑深溝，東側則是碎石陡坡。玉山無論山容或山勢皆在台灣為最具規模，除了是台灣五岳之首
        </Excerpt>
        <Metadata>
          <Inline verticalAlign="center">
            <span>Oct.10</span>
            <Flex>
              <TagIconElem />
              <Spacer axis="horizontal" size={2} />
              <span>人生體悟</span>
            </Flex>
          </Inline>
        </Metadata>
      </Stack>
    </Wrapper>
  );
}

export default PostCard;

const Wrapper = styled.article`
  background-color: #ffffff;
  padding: 13px;
  padding-bottom: 24px;
  box-shadow: 0px 2px 8px rgba(99, 99, 99, 0.2);

  @media (min-width: 768px) {
    max-width: ${270 + 13 * 2}px;
  }

  @media (min-width: 992px) {
    max-width: ${318 + 13 * 2}px;
  }
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

const Title = styled.h3``;

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
