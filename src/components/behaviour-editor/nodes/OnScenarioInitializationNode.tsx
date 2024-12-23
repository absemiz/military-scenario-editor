import React from "react";

import { Typography } from "@mui/material";
import { Node, NodeProps, XYPosition, Handle, Position } from "@xyflow/react";
import IBehaviourEditorComponent from "../types/behaviour-editor-component";


class OnScenarioInitializationNode implements IBehaviourEditorComponent
{
    private static readonly nodeStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        width: '350px',
        padding: '16px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        background: '#f9f9f9',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: '"Roboto", sans-serif',
        gap: '12px',
        position: 'relative',
    };

    public static readonly typeLabel: string = "onScenarioInitialized";

    private readonly mNodeLabel: string = 'On Scenario Initialization';

    private mPosition: XYPosition;

    public constructor(position: XYPosition = { x: 0, y: 0 }) {
        this.mPosition = position;
    }

    public getNodeData(): Node {
        return {
            id: 'on-scenario-initialized',
            position: this.mPosition,
            data: { 'self': this },
            type: OnScenarioInitializationNode.typeLabel
        };
    }

    public static BehaviourEditorComponent(properties: NodeProps): React.ReactElement 
    {
        const self: OnScenarioInitializationNode = properties.data.self as OnScenarioInitializationNode;

        return (
            <div style={OnScenarioInitializationNode.nodeStyle}>

                <Handle id="on-scenario-initialized@flow-out" type="source" position={Position.Right} />
                
                <Typography variant="h5" style={{ color: '#1976d2', fontWeight: 'bold' }}>
                    {self.mNodeLabel}
                </Typography>

                <Typography variant="h6" style={{ color: '#1976d2', fontWeight: 'normal', position: "absolute", right: '8px', top: 'translateY(-50%)' }}>
                    Flow Out
                </Typography>
            </div>
        );
    }
}

export default OnScenarioInitializationNode;