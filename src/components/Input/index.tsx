import React from "react";
import "./style.css";

type IProps = {
  type: string;
  name: string;
  placeholder: string;
};

function Input({ type, name, placeholder }: IProps) {
  return (
    <div className="wrapper-input">
      <label htmlFor={name}>Node text</label>
      <input id={name} type={type} name={name} placeholder={placeholder} />
    </div>
  );
}

export default Input;
