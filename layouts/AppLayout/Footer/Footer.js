import styled from "styled-components";
import Link from "next/link";

import Container from "components/Container";
import Inline from "components/Inline";
import Stack from "components/Stack";
import Spacer from "components/Spacer";

function Footer() {
  return (
    <Wrapper>
      <Container>
        <Inline align="spaceBetween">
          <div>
            <Link href="/" passHref>
              <LogoText>Justin writes</LogoText>
            </Link>
            <Spacer axis="vertical" size="12" />
            <Email>justin@justinwrites.co</Email>
            <Spacer axis="vertical" size="6" />
            <CopyRight>Designed and built by Justin Chien in 2021.</CopyRight>
          </div>
          <SiteMap>
            <Inline spacing="lg">
              <Link href="/blog">Blog</Link>
              <Link href="/books">Books</Link>
              <Stack spacing="smp">
                <Link href="/dev">Dev</Link>
                <Link href="/dev/portfolio">Dev Portfolio</Link>
                <Link href="/dev/blog">Dev Blog</Link>
              </Stack>
              <Link href="/newsletter">Newsletter</Link>
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

const LogoText = styled.div`
  font-family: var(--font-mont);
  font-weight: 600;
  color: var(--gray-700);
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
