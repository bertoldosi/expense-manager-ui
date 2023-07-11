import styled from "styled-components";

interface PropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width: string | number;
  height?: string | number;
}

const Scontent = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.color};
  cursor: pointer;
`;

export const ChevronDoubleRight = ({
  width = "40",
  height = "40",
  onClick,
}: PropsType) => {
  return (
    <Scontent onClick={onClick}>
      <svg
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
        />
      </svg>
    </Scontent>
  );
};
