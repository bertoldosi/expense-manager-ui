import styled from "styled-components";

interface SmonthItemType {
  isSelected: boolean;
}

export const Scontent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  input {
    background-color: transparent;
    border: none;
  }

  header {
    width: 100%;
    display: flex;
    padding: 1rem 0;
    margin-bottom: 2rem;

    border-bottom: 1px solid ${(props) => props.theme.color};
    align-items: center;
    justify-content: space-around;

    span {
      font-size: 2rem;
    }
  }
`;

export const ScontentSelectedDate = styled.div`
  width: 100%;
  max-width: 30rem;
  display: flex;
  flex-wrap: wrap;
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

export const SmonthItem = styled.span<SmonthItemType>`
  width: 5rem;
  height: 5rem;
  display: flex;
  font-weight: 800;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${(props) => props.theme.backgroundSecondary};
  color: ${(props) => props.theme.colorSecondary};
  margin: 1rem;
  cursor: pointer;

  background-color: ${(props) =>
    props.isSelected ? "#1B1B1D" : props.theme.backgroundSecondary};

  color: ${(props) => (props.isSelected ? "#fff" : props.theme.colorSecondary)};
`;
