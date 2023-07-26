import styled from "styled-components";
import css from "styled-jsx/css";

interface SrowTableType {
  paymentStatus: "closed" | "open";
}

export const Scontent = styled.div`
  height: calc(100vh - 32.2rem);
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    width: 6px;
    background: ${(props) => props.theme.backgroundBory};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.backgroundSecondary};
  }

  @media (max-width: 700px) {
    height: min-content;
  }
`;

export const SrowTable = styled.span<SrowTableType>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.5rem;
  background-color: ${(props) => props.theme.backgroundPrimary};

  > strong {
    width: max-content;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0 1rem;
  }

  ${(props): any => {
    if (props.paymentStatus === "closed") {
      return css`
        background-color: #15ac4e;
      `;
    }

    return css`
      background-color: initial;
    `;
  }}

  &:hover {
    background-color: ${(props) => props.theme.backgroundPrimary};
  }
`;

export const NoResult = styled.div`
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.backgroundPrimary};
  border-radius: 0.3rem;

  span {
    font-size: 2rem;
  }
`;
