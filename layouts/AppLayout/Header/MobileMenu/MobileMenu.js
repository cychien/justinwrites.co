import { Dialog } from "@headlessui/react";
import XIcon from "@heroicons/react/outline/XIcon";
import ChevronRightIcon from "@heroicons/react/outline/ChevronRightIcon";
import styled from "styled-components";
import Link from "next/link";

import VisuallyHidden from "components/VisuallyHidden";
import Inline from "components/Inline";
import Stack from "components/Stack";
import Spacer from "components/Spacer";
import Container from "components/Container";

// TODO: fade-in animation
// TODO: use 3-column grid

function MobileMenu({ onClose, pages }) {
  return (
    <Menu>
      <Content>
        <Container>
          <Header>
            <Inline align="right">
              <VisuallyHidden>
                <h2>Menu</h2>
              </VisuallyHidden>
              <CloseMenuButton onClick={onClose}>
                <CloseIcon />
              </CloseMenuButton>
            </Inline>
          </Header>

          <Spacer axis="vertical" size="28" />

          <Items>
            <Stack spacing="lg">
              {pages.map((page) => (
                <Inline
                  key={page.title}
                  align="spaceBetween"
                  verticalAlign="center"
                >
                  <Link href={page.url} passHref>
                    <ItemName>{page.title}</ItemName>
                  </Link>
                  {/* <GotoIcon /> */}
                </Inline>
              ))}
            </Stack>
          </Items>
        </Container>
      </Content>
    </Menu>
  );
}

export default MobileMenu;

const Header = styled.div`
  padding: ${16 + 12}px 0 12px;
`;

const CloseMenuButton = styled.button`
  border: none;
  background: transparent;
`;

const CloseIcon = styled(XIcon)`
  width: 32px;
  height: 32px;
  color: var(--gray-900);
`;

const Menu = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const Items = styled.div`
  padding: 0px 32px;
`;

const ItemName = styled.a`
  text-decoration: none;
  font-size: ${24 / 16}rem;
  font-weight: bold;
`;

const GotoIcon = styled(ChevronRightIcon)`
  width: 24px;
  height: 24px;
  color: var(--gray-500);
`;
