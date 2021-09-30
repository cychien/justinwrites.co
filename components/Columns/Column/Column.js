import styled, { css } from "styled-components";

const BREAKPOINTS = {
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
};

function mixin(breakpoint) {
  return css`
    @media (max-width: ${BREAKPOINTS[breakpoint]}) {
      display: none;
    }
  `;
}

const Column = styled.div`
  flex: 1;

  ${({ hideWhenBelow }) => (hideWhenBelow ? mixin(hideWhenBelow) : null)}
`;

export default Column;
