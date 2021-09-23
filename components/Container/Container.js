import styled from "styled-components";

const Container = styled.div`
  padding: 0 16px;
  margin: auto;
  width: 100%;

  @media (min-width: 576px) {
    max-width: 576px;
  }

  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 992px) {
    max-width: 1100px;
  }
`;

export default Container;
