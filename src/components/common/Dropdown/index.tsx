import { ReactNode, useState } from "react";

import { BsChevronUp } from "@icons/BsChevronUp";
import { BsChevronDown } from "@icons/BsChevronDown";
import { Scontainer, Scontent, Sheader } from "./styles";

type PropsType = {
  label?: string;
  icon?: ReactNode;
  children: ReactNode;
  hideChevronIcon?: boolean;
  position: "left" | "right";
};

function Dropdown({
  label,
  icon,
  children,
  hideChevronIcon,
  position,
}: PropsType) {
  const [isVisible, setIsVisible] = useState(false);

  const RenderIcon = ({ isVisible = false }) =>
    isVisible ? (
      <BsChevronUp width={25} height={25} />
    ) : (
      <BsChevronDown width={25} height={25} />
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
