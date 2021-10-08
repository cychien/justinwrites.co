import styled from "styled-components";
import Link from "next/link";

import Container from "components/Container";
import Inline from "components/Inline";
import Spacer from "components/Spacer";
import pages from "constants/pages";

function Footer({ blogName, enabledFeatures, email }) {
  const availablePages = pages.filter((page) =>
    enabledFeatures.includes(page.value)
  );

  return (
    <Wrapper>
      <Container>
        <Inline align="spaceBetween">
          <div>
            <Link href="/" passHref>
              <LogoText>{blogName}</LogoText>
            </Link>
            <Spacer axis="vertical" size="12" />
            <Email>{email}</Email>
            <Spacer axis="vertical" size="6" />
            <CopyRight>Designed and built by Justin Chien in 2021.</CopyRight>
          </div>
          <SiteMap>
            <Inline spacing="lg">
              {availablePages.map((page) => (
                <Link href={page.url} key={page.title} passHref>
                  <PageLink>{page.title}</PageLink>
                </Link>
              ))}
            </Inline>
          </SiteMap>
        </Inline>
      </Container>
    </Wrapper>
  );
}

export default Footer;

const Wrapper = styled.footer`
  padding: 24px 0;
  border-top: 1px solid var(--gray-300);
  background-color: var(--gray-100);

  @media (min-width: 576px) {
    padding: 54px 0;
  }
`;

const LogoText = styled.a`
  font-family: var(--font-mont);
  font-weight: 600;
  color: var(--gray-700);

  transition: color 150ms;

  &:hover {
    color: var(--gray-500);
  }
`;

const Email = styled.div`
  color: var(--gray-700);
`;

const CopyRight = styled.p`
  max-width: 352px;
  font-size: ${14 / 16}rem;
  color: var(--gray-400);
`;

const SiteMap = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
    color: var(--gray-700);
  }
`;

const PageLink = styled.a`
  color: var(--gray-700);

  transition: color 150ms;

  &:hover {
    color: var(--gray-500);
  }
`;
