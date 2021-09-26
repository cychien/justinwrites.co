import { useState, useCallback } from "react";
import styled from "styled-components";
import Link from "next/link";
import MenuAlt4Icon from "@heroicons/react/outline/MenuAlt4Icon";

import Container from "components/Container";
import Inline from "components/Inline";
import ShiftBy from "components/ShiftBy";
import MobileMenu from "./MobileMenu";
import pages from "constants/pages";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true);
  }, [setIsMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, [setIsMobileMenuOpen]);

  return (
    <Wrapper>
      <Container>
        <Flex>
          <Left>
            <Link href="/" passHref>
              <Logo>Justin writes</Logo>
            </Link>
          </Left>

          <DesktopNav>
            <Inline spacing="lg">
              {pages.map((page) => (
                <Link href={page.url} passHref key={page.title}>
                  <NavItem>{page.title}</NavItem>
                </Link>
              ))}
            </Inline>
          </DesktopNav>

          <MobileNav>
            <ShiftBy y={3}>
              <OpenMenuButton onClick={openMobileMenu}>
                <MenuIcon />
              </OpenMenuButton>
            </ShiftBy>
          </MobileNav>

          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={closeMobileMenu}
            pages={pages}
          />
        </Flex>
      </Container>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.header`
  padding: var(--spacing-2) 0;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const Left = styled.div`
  margin-right: auto;
`;

const Logo = styled.a`
  font-family: var(--font-mont);
  font-weight: 500;
  font-size: ${24 / 16}rem;
`;

const DesktopNav = styled.nav`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

const NavItem = styled.a`
  text-transform: uppercase;
`;

const MobileNav = styled.nav`
  display: block;

  @media (min-width: 768px) {
    display: none;
  }
`;

const OpenMenuButton = styled.button`
  border: none;
  background: transparent;
`;

const MenuIcon = styled(MenuAlt4Icon)`
  width: 32px;
  height: 32px;
  color: var(--gray-900);
`;
