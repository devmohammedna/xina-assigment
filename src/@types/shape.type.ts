import { ReactFlowJsonObject, Node } from "reactflow";
import { ShapeConstant } from "../redux/constants/shape.constant";

export type Shape = {
  id: string;
  type: string;
  data: { label: string };
  position: { x: number; y: number };
};

export interface ShapeState {
  loading: boolean;
  error: string;
  selectedNode: Node | null;
  data: ReactFlowJsonObject<any, any>;
}

export interface UPDATE_NODE_NAME_START {
  type: ShapeConstant.UPDATE_NODE_NAME_START;
}

export interface UPDATE_NODE_NAME_SUCCESS {
  type: ShapeConstant.UPDATE_NODE_NAME_SUCCESS;
  payload: string;
}

export interface UPDATE_NODE_NAME_FAIL {
  type: ShapeConstant.UPDATE_NODE_NAME_FAIL;
}

export interface SELECT_NODE {
  type: ShapeConstant.SELECT_NODE;
  payload: string;
}
export interface UNSELECT_NODE {
  type: ShapeConstant.UNSELECT_NODE;
}
export interface UPLOAD_NODE_START {
  type: ShapeConstant.UPLOAD_NODE_START;
}
export interface UPLOAD_NODE_SUCCESS {
  type: ShapeConstant.UPLOAD_NODE_SUCCESS;
  payload: ReactFlowJsonObject<any, any>;
}
export interface UPLOAD_NODE_FAIL {
  type: ShapeConstant.UPLOAD_NODE_FAIL;
}

export interface CHANGE_NODE_START {
  type: ShapeConstant.CHANGE_NODE_START;
}
export interface CHANGE_NODE_SUCCESS {
  type: ShapeConstant.CHANGE_NODE_SUCCESS;
  payload: ReactFlowJsonObject<any, any>;
}
export interface CHANGE_NODE_FAIL {
  type: ShapeConstant.CHANGE_NODE_FAIL;
}

export interface ADD_NODE_START {
  type: ShapeConstant.ADD_NODE_START;
}

export interface ADD_NODE_SUCCESS {
  payload: any;
  type: ShapeConstant.ADD_NODE_SUCCESS;
}

export interface ADD_NODE_FAIL {
  type: ShapeConstant.ADD_NODE_FAIL;
}


export type ActionTypes =
  | UPDATE_NODE_NAME_START
  | UPDATE_NODE_NAME_SUCCESS
  | UPDATE_NODE_NAME_FAIL
  | SELECT_NODE
  | UNSELECT_NODE
  | ADD_NODE_START
  | ADD_NODE_SUCCESS
  | ADD_NODE_FAIL
  | UPLOAD_NODE_START
  | UPLOAD_NODE_SUCCESS
  | UPLOAD_NODE_FAIL
  | CHANGE_NODE_START
  | CHANGE_NODE_SUCCESS
  | CHANGE_NODE_FAIL;