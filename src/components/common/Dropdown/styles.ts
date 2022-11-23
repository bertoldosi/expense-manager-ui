import styled, { css } from "styled-components";

type PropsTypeContainer = {
  isVisible: boolean;
};

type PropsTypeContent = {
  isVisible: boolean;
  position: "left" | "right";
};

export const Scontainer = styled.div<PropsTypeContainer>`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  height: 100%;

  @media (max-width: 300px) {
    position: initial;
  }
`;

export const Sheader = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
  font-size: 2rem;

  strong {
    margin-left: 0.5rem;
  }

  svg {
    margin-left: 0.5rem;
  }
`;

export const Scontent = styled.div<PropsTypeContent>`
  display: ${(props) => (props.isVisible ? "initial" : "none")};
  position: absolute;
  top: 7rem;
  border-radius: 0 0 0.5rem 0.5rem;
  background-color: ${(props) => props.theme.color};
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);

  ${(props) =>
    props.position === "left"
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `}

  @media (max-width: 300px) {
    width: 100%;
    margin-top: 1.5rem;
  }
`;
