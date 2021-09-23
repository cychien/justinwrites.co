import styled from "styled-components";

function ShiftBy({ x = 0, y = 0, children }) {
  return (
    <Wrapper
      style={{
        "--transform": `translate(${x}px, ${y}px)`,
      }}
    >
      {children}
    </Wrapper>
  );
}
export default ShiftBy;

const Wrapper = styled.div`
  transform: var(--transform);
`;
