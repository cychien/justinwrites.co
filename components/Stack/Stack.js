import React from "react";
import styled from "styled-components";

const ALIGNS = {
  left: {
    "--align-items": "stretch",
  },
  right: {
    "--align-items": "flex-end",
  },
  center: {
    "--align-items": "center",
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

function Stack({ align = "left", spacing = "md", children }) {
  const alignStyles = ALIGNS[align];
  const spacingStyles = SPACINGS[spacing];

  const styles = { ...alignStyles, ...spacingStyles };

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

export default Stack;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: var(--align-items);

  & > *:not(:last-child) {
    margin-bottom: var(--spacing);
  }
`;
