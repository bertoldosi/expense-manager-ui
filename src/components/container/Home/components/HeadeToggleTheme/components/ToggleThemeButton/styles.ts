import styled from "styled-components";

export const Container = styled.div`
  input {
    opacity: 0;
    position: absolute;
  }
  label {
    width: 40px;
    height: 15px;
    background-color: #333;
    display: flex;
    border-radius: 50px;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    position: relative;
    cursor: pointer;
    transform: scale(1.5);
    > div {
      width: 18px;
      height: 18px;
      background-color: white;
      position: absolute;
      top: -1px;
      left: -1px;
      border-radius: 50%;
      transition: transform 0.2s linear;
    }
  }
  input:checked + label > div {
    transform: translateX(24px);
  }
`;
