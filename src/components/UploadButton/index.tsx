import React from "react";
import "./style.css";

type IProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
};

function UploadButton({ onChange, loading }: IProps) {
  return (
    <div className="upload-btn-wrapper">
      <button className="btn">{loading ? "loadding..." : "Upload"}</button>
      <input onChange={(e) => onChange(e)} type="file" name="myfile" />
    </div>
  );
}

export default UploadButton;
