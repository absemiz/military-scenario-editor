import { Node as FlowNode } from "@xyflow/react";

export default interface IBehaviourEditorComponent {
    getNodeData: () => FlowNode;
};