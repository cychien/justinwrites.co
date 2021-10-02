import React from "react";
import styled from "styled-components";

const ALIGNS = {
  left: {
    "--justify-content": "flex-start",
  },
  right: {
    "--justify-content": "flex-end",
  },
  center: {
    "--justify-content": "center",
  },
  spaceBetween: {
    "--justify-content": "space-between",
  },
};

const SPACINGS = {
  none: {
    "--spacing": "0px",
  },
  xs: {
    "--spacing": "var(--spacing-1)",
  },
  sm: {
    "--spacing": "var(--spacing-2)",
  },
  smp: {
    "--spacing": "var(--spacing-3)",
  },
  md: {
    "--spacing": "var(--spacing-4)",
  },
  mdp: {
    "--spacing": "var(--spacing-6)",
  },
  lg: {
    "--spacing": "var(--spacing-8)",
  },
};

const VERTICAL_ALIGNS = {
  top: {
    "--align-items": "stretch",
  },
  center: {
    "--align-items": "center",
  },
  bottom: {
    "--align-items": "flex-end",
  },
};

function Inline({
  align = "left",
  spacing = "md",
  verticalAlign = "top",
  wrap = "wrap",
  children,
}) {
  const alignStyles = ALIGNS[align];
  const spacingStyles = SPACINGS[spacing];
  const verticalAlignStyles = VERTICAL_ALIGNS[verticalAlign];

  const styles = {
    ...alignStyles,
    ...spacingStyles,
    ...verticalAlignStyles,
    "--wrap": wrap,
  };

  return (
    <Wrapper style={styles}>
      {/* Support nested structure. Avoid css properties being overwritten. */}
      {React.Children.toArray(children)
        .filter((child) => !!child)
        .map((child, index) => (
          <div key={index}>{child}</div>
        ))}
    </Wrapper>
  );
}

export default Inline;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: var(--wrap);
  margin-top: calc(var(--spacing) * -1);
  margin-left: calc(var(--spacing) * -1);
  justify-content: var(--justify-content);
  align-items: var(--align-items);

  & > * {
    margin-top: var(--spacing);
    margin-left: var(--spacing);
  }
`;
