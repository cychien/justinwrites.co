import styled from "styled-components";

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

function Columns({ children, verticalAlgin = "top" }) {
  const verticalAlignStyles = VERTICAL_ALIGNS[verticalAlgin];

  const styles = { ...verticalAlignStyles };

  return <Wrapper style={styles}>{children}</Wrapper>;
}

export default Columns;

const Wrapper = styled.div`
  display: flex;
  align-items: var(--align-items);
`;
