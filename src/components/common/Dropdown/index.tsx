import { ReactNode } from "react";

import { BsChevronUp } from "@icons/BsChevronUp";
import { BsChevronDown } from "@icons/BsChevronDown";
import { Scontainer, Scontent, Sheader } from "./styles";
import { useTheme } from "styled-components";

type PropsType = {
  label?: string;
  icon?: ReactNode;
  children: ReactNode;
  hideChevronIcon?: boolean;
  position: "left" | "right";
  isVisible: boolean;
  setIsVisible: Function;
};

function Dropdown({
  label,
  icon,
  children,
  hideChevronIcon,
  position,
  isVisible = false,
  setIsVisible,
}: PropsType) {
  const theme = useTheme();

  const RenderIcon = ({ isVisible = false }) =>
    isVisible ? (
      <BsChevronUp
        width={25}
        height={25}
        fill={theme.color}
        stroke={theme.color}
      />
    ) : (
      <BsChevronDown
        width={25}
        height={25}
        fill={theme.color}
        stroke={theme.color}
      />
    );

  return (
    <Scontainer isVisible={isVisible}>
      <Sheader onClick={() => setIsVisible(!isVisible)}>
        {icon}
        {label && <strong>{label}</strong>}

        {!hideChevronIcon && <RenderIcon isVisible={isVisible} />}
      </Sheader>

      <Scontent isVisible={isVisible} position={position}>
        {children}
      </Scontent>
    </Scontainer>
  );
}

export default Dropdown;
