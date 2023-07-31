import styled from "styled-components";

export const Scontainer = styled.div`
  width: 100%;
  overflow-y: none;
  padding-bottom: 2rem;
  gap: 0.5rem;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
`;

export const SselectDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  padding: 0.5rem;
  border-radius: 0.2rem;

  border: solid 1px ${(props) => props.theme.color};
  font-size: 1.5rem;

  > span {
    flex: 1;
    cursor: pointer;
  }
`;

export const SmodalDate = styled.div`
  width: 100%;
  left: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundBory};
  color: ${(props) => props.theme.colorSecondary};
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);

  header {
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.backgroundPrimary};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: ${(props) => props.theme.color};
  }

  > div {
    width: 100%;
    max-width: 30rem;
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
    gap: 0.5rem;
  }

  > button {
    margin-bottom: 2rem;
  }
`;

export const SoptionsMonth = styled.h4`
  width: 4rem;
  height: 4rem;
  font-size: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.backgroundPrimary};
  color: ${(props) => props.theme.color};
  cursor: pointer;
`;
