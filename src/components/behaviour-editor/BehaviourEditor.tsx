import { Dialog } from '@mui/material';
import React, { useState, useCallback, useMemo } from 'react';

import { 
    ReactFlowProvider,
    ReactFlow, 
    Background, 
    BackgroundVariant, 
    Node as FlowNode, 
    NodeTypes, 
    XYPosition, 
    applyNodeChanges, 
    applyEdgeChanges, 
    Edge, 
    EdgeChange, 
    NodeChange, 
    addEdge, 
    Connection
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import GoToTaskNode from './nodes/GoToTaskNode';
import { useApplicationStateContext } from '../../hooks/useApplicationStateContext';
import { useMapElementsContext } from '../../hooks/useMapElementsContext';
import MilitaryEntity from '../../models/military-entity';

import AddTaskMenu from './AddTaskMenu';
import OnScenarioInitializationNode from './nodes/OnScenarioInitializationNode';
import BehaviourEditorManager from './BehaviourEditorManager';

interface BehaviourEditorProperties
{
    open: boolean 
};

const onScenarioInitializedNode: OnScenarioInitializationNode = new OnScenarioInitializationNode();

const BehaviourEditor: React.FC<BehaviourEditorProperties> = (properties: BehaviourEditorProperties) => {
    const applicationState = useApplicationStateContext();
    const mapElements = useMapElementsContext();

    const nodeTypes: NodeTypes = useMemo(
        () => {
            return {
                [GoToTaskNode.typeLabel]: GoToTaskNode.BehaviourEditorComponent,
                [OnScenarioInitializationNode.typeLabel]: OnScenarioInitializationNode.BehaviourEditorComponent
            };
        },
        []
    );

    const initialNodes: FlowNode[] = [onScenarioInitializedNode.getNodeData()];
    const initialEdges: Edge[] = [];

    const [nodes, setNodes] = useState<FlowNode[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges)

    const addNode = (node: FlowNode) => {
        setNodes((currentNodes: FlowNode[]) => [...currentNodes, node]);
    };

    const [rightClickPosition, setRightClickPosition] = useState<{ mouseX: number, mouseY: number } | null>(null);

    const handleRightClick: React.MouseEventHandler<HTMLDivElement> = (event) => {

        event.preventDefault();
        
        const lastClickPosition = {
            mouseX: event.clientX,
            mouseY: event.clientY
        };

        setRightClickPosition(lastClickPosition);
    };

    const handleLeftClick: React.MouseEventHandler<HTMLDivElement> = () => {
        setRightClickPosition(null);
    };

    const handleMenuClose = () => {
        setRightClickPosition(null);
    };

    const addGoToWaypointTaskNode = (editorPosition: XYPosition) => {
        if (applicationState.entityIDToDisplayAttributes !== null)
        {
            const attachedEntity: MilitaryEntity = mapElements.getRenderable(applicationState.entityIDToDisplayAttributes) as MilitaryEntity;

            if (attachedEntity !== undefined && rightClickPosition !== null)
            {
                const taskNode: GoToTaskNode = new GoToTaskNode(attachedEntity, editorPosition);

                addNode(taskNode.getNodeData());
            }
        }
    };

    const isValidConnection = (currentEdges: Edge[], edgeParameters: Connection) => {
        const sourceConnected: boolean = currentEdges.some((edge: Edge) => edge.source === edgeParameters.source);
        const targetConnected: boolean = currentEdges.some((edge: Edge) => edge.target === edgeParameters.target);

        return !sourceConnected && !targetConnected;
    }

    const handleEdgeConnection = (edgeParameters: Connection) => {
        return setEdges((currentEdges: Edge[]) => isValidConnection(currentEdges, edgeParameters) ? addEdge(edgeParameters, currentEdges) : currentEdges);
    };

    const handleNodesChange = useCallback(
        (nodeChanges: NodeChange[]) => setNodes((currentNodes: FlowNode[]) => applyNodeChanges(nodeChanges, currentNodes)),
        [],
    );

    const handleEdgesChange = useCallback(
        (edgeChanges: EdgeChange[]) => setEdges((currentEdges: Edge[]) => applyEdgeChanges(edgeChanges, currentEdges)),
        [],
    );

    const handleConnect = useCallback(
        handleEdgeConnection,
        [],
    );

    return <Dialog open={properties.open} fullScreen={true}>
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlowProvider>
                <ReactFlow nodes={nodes} onNodesChange={handleNodesChange} edges={edges} onEdgesChange={handleEdgesChange} onConnect={handleConnect} fitView={true} nodeTypes={nodeTypes} onContextMenu={handleRightClick} onClick={handleLeftClick}>
                    <Background bgColor='#ffffff' variant={BackgroundVariant.Dots} />
                    <AddTaskMenu open={Boolean(rightClickPosition)} onClose={handleMenuClose} position={rightClickPosition} addGoToWaypointTaskNode={addGoToWaypointTaskNode}></AddTaskMenu>
                    <BehaviourEditorManager />
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    </Dialog>;
}

export default BehaviourEditor;