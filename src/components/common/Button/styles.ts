import styled from "styled-components";

type PropsType = {
  typeButton?: string;
  width?: string;
  height?: string;
};

export const Scontent = styled.button<PropsType>`
  width: 100%;
  max-width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.2rem;
  padding: 1rem;

  background-color: ${(props) => {
    if (props.typeButton === "primary") {
      return "#0EB3E0";
    }

    if (props.typeButton === "delete") {
      return "#FA3C33";
    }
  }};

  color: ${(props) => {
    if (props.typeButton === "primary") {
      return "#fff";
    }

    if (props.typeButton === "delete") {
      return "#fff";
    }
  }};
`;
