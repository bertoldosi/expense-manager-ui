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
        height: 100%;
        scroll-behavior: smooth;
    }

    html,
    body {
        font-family: 'Source Sans Pro', sans-serif;
        text-rendering: optimizelegibility;
        -webkit-font-smoothing: antialiased;
    }


    body {
        font-size: 1.8rem;
        background: linear-gradient(rgb(14, 94, 139) 0%, rgba(19, 103, 151, 0.855) 46.52%, rgba(24, 114, 165, 0.675) 99.53%, rgba(28, 121, 173, 0.573) 103.84%, rgba(33, 131, 187, 0.4) 103.85%, rgba(45, 156, 219, 0) 103.86%, rgba(43, 152, 214, 0.06) 103.86%) no-repeat;
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
