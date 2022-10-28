import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        outline: 0;
    }

    html {
        font-size: 62.5%;
        scroll-behavior: smooth;

        @media (max-width: 700px) {
            font-size: 45%;   
        }
    }

    html,
    body {
        font-family: 'Source Sans Pro', sans-serif;
        text-rendering: optimizelegibility;
        -webkit-font-smoothing: antialiased;
        color: ${(props) => props.theme.color}
    }

    button{
        cursor: pointer;    
    }
`;

export default GlobalStyle;
