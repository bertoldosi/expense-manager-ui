import styled from "styled-components";

export const Scontainer = styled.div`
  background-color: ${(props) => props.theme.backgroundPrimary};
  padding: 1rem;
  border-radius: 0.3rem;

  & + & {
    margin: 2rem 0;
  }

  > h2 {
    margin-bottom: 2rem;
  }
`;
