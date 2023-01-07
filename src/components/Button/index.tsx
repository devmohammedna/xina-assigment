import React from "react";
import "./style.css";

type IProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "submit" | "button";
};
function Button({ children, onClick, type }: IProps) {
  return (
    <button onClick={onClick} type={type}>
      {children}
    </button>
  );
}

export default Button;
