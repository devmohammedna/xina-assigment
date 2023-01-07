import React from "react";
import "./style.css";
type Props = {
  children: React.ReactNode;
};
export default function Container({ children }: Props) {
  return <div className="wrappper-container">{children}</div>;
}
