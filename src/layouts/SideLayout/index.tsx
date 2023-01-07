import React from "react";
import Shape from "../../components/Shape";

function SideLayout() {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="sideLayout">
      <div className="container">
        {[...Array(2)].map((_, index) => {
          const nodeType = index === 1 ? "circle" : "rectangle";
          return (
            <Shape
              key={index}
              draggable
              onDragStart={(event) => onDragStart(event, nodeType)}
              
              circle={index === 1 && true}
            />
          );
        })}
      </div>
    </aside>
  );
}
export default SideLayout;
