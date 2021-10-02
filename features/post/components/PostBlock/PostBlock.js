import styled from "styled-components";
import Image from "next/image";
import TagIcon from "@heroicons/react/solid/TagIcon";

import Stack from "components/Stack";
import Inline from "components/Inline";
import Spacer from "components/Spacer";

function PostBlock() {
  return (
    <Wrapper>
      <ImageWrapper>
        <Image
          src="https://picsum.photos/1200/1200"
          layout="fill"
          objectFit="cover"
          alt="Post Image"
          priority
        />
      </ImageWrapper>

      <ContentWrapper>
        <Title>如果把我們的人生看成一場故事</Title>
        <Spacer axis="vertical" size="4" when={{ mdAndUp: 12 }} />
        <Excerpt>
          玉山主峰山貌高峻，四面皆是陡壁危崖，南北兩側是千仞峭壁，西側絕壑深溝，東側則是碎石陡坡。玉山無論山容或山勢皆在台灣為最具規模，除了是台灣五岳之首
        </Excerpt>
        <Spacer axis="vertical" size="0" when={{ mdAndUp: 4 }} />
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
      </ContentWrapper>
    </Wrapper>
  );
}

export default PostBlock;

const Wrapper = styled.article`
  display: flex;
  align-items: center;
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

const ContentWrapper = styled.div`
  max-width: 520px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const Title = styled.h3`
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
