import styled from "styled-components";
import Image from "next/image";
import TagIcon from "@heroicons/react/solid/TagIcon";

import Inline from "components/Inline";
import Spacer from "components/Spacer";

function PostBlock() {
  return (
    <article>
      <Inline spacing="none" wrap="nowrap">
        <ImageWrapper>
          <Image
            src="https://picsum.photos/200/300"
            layout="fill"
            objectFit="cover"
            alt="Post Image"
            priority
          />
        </ImageWrapper>
        <Spacer
          axis="horizontal"
          size="12"
          when={{ smAndUp: 24, mdAndUp: 36 }}
        />
        <ContentWrapper>
          <div>
            <MobileMetadata>
              <Tag>人生體悟</Tag>
              <Tag>Productivity</Tag>
            </MobileMetadata>
            <Title>如果把我們的人生看成一場故事</Title>
            <Spacer axis="vertical" size="0" when={{ mdAndUp: 14 }} />
            <Excerpt>
              玉山主峰山貌高峻，四面皆是陡壁危崖，南北兩側是千仞峭壁，西側絕壑深溝，東側則是碎石陡坡。玉山無論山容或山勢皆在台灣為最具規模，除了是台灣五岳之首
            </Excerpt>
            <Spacer axis="vertical" size="0" when={{ mdAndUp: 4 }} />
            <MobileMetadata2>
              <div>Oct.10</div>
            </MobileMetadata2>
            <Metadata>
              <Inline verticalAlign="center">
                <div>Oct.10</div>
                <Flex>
                  <TagIconElem />
                  <Spacer axis="horizontal" size={2} />
                  <div>
                    <Tag>人生體悟</Tag>
                    <Tag>Productivity</Tag>
                  </div>
                </Flex>
              </Inline>
            </Metadata>
          </div>
        </ContentWrapper>
      </Inline>
    </article>
  );
}

export default PostBlock;

const ImageWrapper = styled.div`
  position: relative;

  width: 88px;
  height: 88px;

  @media (min-width: 768px) {
    width: 237px;
    height: 168px;
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
  align-items: center;
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
  }
`;

const Metadata = styled.div`
  color: var(--gray-400);
  font-size: ${14 / 16}rem;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

const TagIconElem = styled(TagIcon)`
  width: 16px;
  height: 16px;
  color: var(--gray-400);
  display: block;
`;

const Tag = styled.span`
  &:not(:last-child) {
    margin-right: 17px;
    position: relative;

    &::after {
      position: absolute;
      right: -11px;
      top: 8px;

      content: "";
      height: 4px;
      width: 4px;
      background-color: var(--gray-300);
      border-radius: 50%;
    }
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const MobileMetadata = styled.div`
  color: var(--gray-400);
  font-size: ${14 / 16}rem;
  display: block;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMetadata2 = styled.div`
  color: var(--gray-400);
  font-size: ${14 / 16}rem;
  display: block;

  @media (min-width: 768px) {
    display: none;
  }
`;
