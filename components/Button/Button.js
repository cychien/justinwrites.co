import React from "react";
import styled from "styled-components";

// Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#button

const SIZES = {
  sm: {
    "--border-radius": "3.2px",
    "--font-size": "0.875rem",
    "--padding": "4px 8px",
  },
  md: {
    "--border-radius": "4px",
    "--font-size": "1rem",
    "--padding": "8px 32px",
  },
};

const COLORS = {
  primary: {
    "--main-color": "var(--gray-700)",
    "--hovered-main-color": "var(--gray-500)",
    "--shadow-color": "var(--gray-300)",
    "--text-color": "#fff",
  },
};

function ButtonV2({
  children,
  size = "md",
  variant = "fill",
  color = "primary",
  disabled,
  onClick,
  isLoading,
  // aria-related props
  accessibilityLabel,
  ariaDescribedBy,

  // styles can be extended by styled-component
  ...delegated
}) {
  const sizeStyles = SIZES[size];
  const colorStyles = COLORS[color];

  const styles = { ...sizeStyles, ...colorStyles };

  let Component;
  if (variant === "fill") {
    Component = FillButton;
  } else if (variant === "outline") {
    Component = OutlineButton;
  } else if (variant === "plain") {
    Component = PlainButton;
  }

  return (
    <Component
      type="button"
      style={styles}
      disabled={disabled || isLoading}
      onClick={onClick}
      aria-label={accessibilityLabel}
      aria-describedby={ariaDescribedBy}
      {...delegated}
    >
      {children}
    </Component>
  );
}

export default ButtonV2;

const ButtonBase = styled.button`
  font-size: var(--font-size);
  line-height: 1.7;
  border: none;
  border-radius: var(--border-radius);
  padding: var(--padding);
  cursor: pointer;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    box-shadow: 0 0 0 0.2rem var(--shadow-color);
    outline: 0;
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const FillButton = styled(ButtonBase)`
  background-color: var(--main-color);
  color: var(--text-color);
  border: 1px solid transparent;

  &:hover {
    background-color: var(--hovered-main-color);
  }
`;

const OutlineButton = styled(ButtonBase)`
  background-color: white;
  color: var(--main-color);
  border: 1px solid currentColor;

  &:hover {
    background-color: var(--main-color);
    color: var(--text-color);
  }
`;

const PlainButton = styled(ButtonBase)`
  background-color: transparent;
  color: var(--main-color);
  border: 1px solid transparent;

  &:hover {
    color: var(--hovered-main-color);
  }
`;
