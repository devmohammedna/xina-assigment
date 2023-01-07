import { memo } from "react";
import "./style.css";

type IProps = {
  circle?: boolean;
  id?: string;
  name?: string;
  onClick?: (id: string) => void;
  data?: any;
  className?: string;
  onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
  draggable?: boolean;
};

function Shape({
  circle,
  onClick,
  id,
  data,
  onDragStart,
  draggable = true,
}: IProps) {
  return (
    <>
      <div
        draggable={draggable}
        id={id}
        onClick={() => onClick?.(id!)}
        onDragStart={onDragStart}
        className={circle ? "wrraper-circle" : "wrraper-rectangle"}
      >
        <h4>{data?.label || "node"}</h4>
      </div>
    </>
  );
}

export default memo(Shape);
