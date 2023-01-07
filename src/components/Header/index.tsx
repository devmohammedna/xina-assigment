import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShapeConstant } from "../../redux/constants/shape.constant";
import { AppState } from "../../redux/store";
import Button from "../Button";
import Input from "../Input";
import UploadButton from "../UploadButton";
import "./style.css";

function Header() {
  const dispatch = useDispatch();
  const { loading, selectedNode, data } = useSelector(
    (state: AppState) => state.shape
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: ShapeConstant.UPDATE_NODE_NAME_START });
    dispatch({
      type: ShapeConstant.UPDATE_NODE_NAME_SUCCESS,
      payload: e.currentTarget.update.value,
    });

    dispatch({ type: ShapeConstant.UNSELECT_NODE });
    e.currentTarget.reset();
  };

  const jsonFileDownload = () => {
    const fileName = "finename.json";
    const _data = new Blob([JSON.stringify(data)], { type: "text/json" });
    const jsonURL = window.URL.createObjectURL(_data);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = jsonURL;
    link.setAttribute("download", fileName);
    link.click();
    document.body.removeChild(link);
  };

  const onUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const json = JSON.parse(e.target?.result as string);
        dispatch({ type: ShapeConstant.UPLOAD_NODE_START });
        dispatch({ type: ShapeConstant.UPLOAD_NODE_SUCCESS, payload: json });
      };
      reader.readAsText(file);
    }
  };

  const unSelectNode = useCallback(() => {
    dispatch({ type: "UNSELECT_NODE" });
  }, [dispatch]);

  return (
    <div className="wrapper">
      <div className="container">
        <form
          style={{ visibility: selectedNode ? "visible" : "hidden" }}
          onSubmit={handleSubmit}
        >
          <Input name="update" placeholder="Node" type="text" />
          <Button type="submit">Update</Button>
          <Button type="button" onClick={unSelectNode}>
            unselect
          </Button>
        </form>

        <div>
          <UploadButton loading={loading} onChange={onUploadFile} />
          <Button onClick={jsonFileDownload}>Download</Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
