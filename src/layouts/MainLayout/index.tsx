import Shape from "../../components/Shape";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/store";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Connection,
  Controls,
  NodeChange,
  EdgeChange,
  Edge,
  ReactFlow,
  ReactFlowProvider,
  MarkerType,
  ReactFlowInstance,
  Node,
  ReactFlowJsonObject,
} from "reactflow";
import SideLayout from "../SideLayout";
import { useCallback, useEffect, useRef, useState } from "react";
import "reactflow/dist/style.css";
import { ShapeConstant } from "../../redux/constants/shape.constant";

const getId = () => crypto.randomUUID();

const nodeTypes = {
  custom: Shape,
};

const defaultEdgeOptions = {
  style: { strokeWidth: 1, stroke: "black" },
  type: "floating",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "black",
  },
};

function MainLayout() {
  const reactFlowWrapper = useRef<any>(null);
  const { selectedNode, data = {} as ReactFlowJsonObject<any, any> } =
    useSelector((state: AppState) => state.shape);
  const dispatch = useDispatch();
  const [nodes, setNodes] = useState<Node[]>(() => data.nodes || []);
  const [edges, setEdges] = useState(() => data.edges || []);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nodes) => applyNodeChanges(changes, nodes));
      if (reactFlowInstance) {
        dispatch({
          type: ShapeConstant.CHANGE_NODE_SUCCESS,
          payload: reactFlowInstance?.toObject(),
        });
      }
    },
    [dispatch, reactFlowInstance]
  );

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onNodeSelect = useCallback(
    (event: any, node: Node) =>
      dispatch({
        type: ShapeConstant.SELECT_NODE,
        payload: node,
      }),
    [dispatch]
  );

  const onConnect = useCallback((params: Edge<any> | Connection) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onDragOver = useCallback(
    (event: {
      preventDefault: () => void;
      dataTransfer: { dropEffect: string };
    }) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    []
  );

  const onDrop = useCallback(
    (event: {
      preventDefault: () => void;
      dataTransfer: { getData: (arg0: string) => any };
      clientX: number;
      clientY: number;
    }) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

      const position = reactFlowInstance?.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // add a new node
      const newNode: Node = {
        id: getId(),
        type: nodes.length === 0 ? "input" : "default",
        className: type,
        position: position!,
        data: { label: `node` },
      };

      setNodes((ns) => ns.concat(newNode));
    },
    [nodes.length, reactFlowInstance]
  );

  useEffect(() => {
    if (reactFlowInstance) {
      dispatch({
        type: ShapeConstant.CHANGE_NODE_SUCCESS,
        payload: reactFlowInstance?.toObject(),
      });
    }
  }, [edges.length, reactFlowInstance, dispatch]);

  useEffect(() => {
    if (nodes.length === 0) {
      setNodes(data.nodes || []);
    }
    if (edges.length === 0) {
      setEdges(data.edges || []);
    }
  }, [nodes.length, edges.length, data]);

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            defaultEdgeOptions={defaultEdgeOptions}
            fitView
            nodeTypes={nodeTypes}
            onNodeClick={onNodeSelect}
            key={selectedNode}
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        <SideLayout />
      </ReactFlowProvider>
    </div>
  );
}

export default MainLayout;
