import { ReactFlowJsonObject } from "reactflow";
import { ActionTypes, ShapeState } from "../../@types/shape.type";
import { ShapeConstant } from "../constants/shape.constant";

const initialState: ShapeState = {
  data: {} as ReactFlowJsonObject<any, any>,
  loading: false,
  error: "",
  selectedNode: null,
};

export const ShapeReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case ShapeConstant.UPDATE_NODE_NAME_START:
      return {
        ...state,
        loading: true,
      };
    case ShapeConstant.UPDATE_NODE_NAME_SUCCESS:
      const node = state.data.nodes.find(
        (node) => node.id === state.selectedNode?.id
      );
      node!.data.label = action.payload;
      return {
        ...state,
        loading: false,
        selectedNode: null,
      };
    case ShapeConstant.UPDATE_NODE_NAME_FAIL:
      return {
        ...state,
        loading: false,
      };
    case ShapeConstant.SELECT_NODE:
      return {
        ...state,
        selectedNode: action.payload,
      };
    case ShapeConstant.UNSELECT_NODE:
      return {
        ...state,
        selectedNode: null,
      };
    case ShapeConstant.UPLOAD_NODE_START:
      return {
        ...state,
        loading: true,
      };
    case ShapeConstant.UPLOAD_NODE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case ShapeConstant.UPLOAD_NODE_FAIL:
      return {
        ...state,
        loading: false,
      };
    case ShapeConstant.CHANGE_NODE_START:
      return {
        ...state,
        loading: true,
      };
    case ShapeConstant.CHANGE_NODE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case ShapeConstant.CHANGE_NODE_FAIL:
    case ShapeConstant.ADD_NODE_START:
      return {
        ...state,
        loading: true,
      };
    case ShapeConstant.ADD_NODE_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          nodes: [...state.data.nodes, ...action.payload],
        },
        loading: false,
      };
    case ShapeConstant.ADD_NODE_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
