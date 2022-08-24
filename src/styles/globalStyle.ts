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
    }

    html,
    body {
        font-family: 'Source Sans Pro', sans-serif;
        text-rendering: optimizelegibility;
        -webkit-font-smoothing: antialiased;
        background-color:  #2A6B99;

    }


    body {
        font-size: 1.8rem;
        color: #ffff;

        &::-webkit-scrollbar {
            width: 6px;
            height: 6px;
            background-color: #ffff;
        }


        &::-webkit-scrollbar-track-piece {
            background: #1d2a35;
        }
        
        &::-webkit-scrollbar-thumb {
            background: #ffff;
            border-radius: .3px;
        }
    }
`;

export default GlobalStyle;
