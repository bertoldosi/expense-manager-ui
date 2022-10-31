import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1020px;
  display: flex;
  justify-content: end;
  margin: 0 auto;
  padding: 2rem;
  background-color: ${(props) => props.theme.backgroundBory};

  @media (max-width: 700px) {
    padding: 2rem 3rem;
  }
`;