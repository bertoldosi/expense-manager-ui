import styled from "styled-components";

export const Scontent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  background: ${(props) => props.theme.backgroundPrimary};
  padding: 1rem 1.2rem;

  > div {
    display: flex;
    align-items: center;
  }
`;

export const GroupLeft = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ScontentModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Slist = styled.div`
  ul {
    margin-top: 1rem;
    font-size: 1.4rem;
  }

  p {
    font-size: 1.2rem;
    margin-top: 2rem;
  }
`;

export const Sform = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;

  gap: 1rem;

  > button {
    margin-top: 2rem;
  }
`;
