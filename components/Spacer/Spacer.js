import styled, { css } from "styled-components";

function getHeightIn(breakpoint) {
  return function ({ axis, size, when }) {
    return axis === "horizontal"
      ? 1
      : breakpoint && when[`${breakpoint}AndUp`]
      ? when[`${breakpoint}AndUp`]
      : size;
  };
}

function getWidthIn(breakpoint) {
  return function ({ axis, size, when }) {
    return axis === "vertical"
      ? 1
      : breakpoint && when[`${breakpoint}AndUp`]
      ? when[`${breakpoint}AndUp`]
      : size;
  };
}

function mixin(breakpoint) {
  const minWidthTable = {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
  };

  return css`
    @media (min-width: ${minWidthTable[breakpoint]}) {
      width: ${getWidthIn(breakpoint)}px;
      min-width: ${getWidthIn(breakpoint)}px;
      height: ${getHeightIn(breakpoint)}px;
      min-height: ${getHeightIn(breakpoint)}px;
    }
  `;
}

const Spacer = styled.span`
  display: block;
  width: ${getWidthIn()}px;
  min-width: ${getWidthIn()}px;
  height: ${getHeightIn()}px;
  min-height: ${getHeightIn()}px;

  ${({ when }) => (when?.smAndUp ? mixin("sm") : null)}
  ${({ when }) => (when?.mdAndUp ? mixin("md") : null)}
  ${({ when }) => (when?.lgAndUp ? mixin("lg") : null)}
  ${({ when }) => (when?.xlAndUp ? mixin("xl") : null)}
`;

export default Spacer;
