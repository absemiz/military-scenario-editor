import { useReactFlow, Node, Edge } from "@xyflow/react";
import React, { useEffect } from "react";
import OnScenarioInitializationNode from "./nodes/OnScenarioInitializationNode";
import GoToTaskNode from "./nodes/GoToTaskNode";
import { useApplicationStateContext } from "../../hooks/useApplicationStateContext";
import MilitaryEntity from "../../models/military-entity";

const BehaviourEditorManager: React.FC = () => {
    const applicationState = useApplicationStateContext();
    const reactFlow = useReactFlow();

    const getOnScenarioInitializationNode = (currentNodes: Node[]) => {

        const searchResult: Node | undefined = currentNodes.find((node: Node) => node.id === 'on-scenario-initialized');

        if (searchResult !== undefined)
        {
            const onScenarioInitializedNode: OnScenarioInitializationNode = searchResult.data['self'] as OnScenarioInitializationNode;

            return onScenarioInitializedNode;
        }
        else
        {
            return undefined;
        }
    }

    const getValidGoToTasks = (currentNodes: Node[], currentEdges: Edge[]) => {
        const onScenarioInitializedNode: OnScenarioInitializationNode | undefined = getOnScenarioInitializationNode(currentNodes);

        if (onScenarioInitializedNode === undefined)
        {
            return [];
        }
            
        let currentNodeID: string = onScenarioInitializedNode.getNodeData().id;

        let validGoToTasks: GoToTaskNode[] = []

        currentEdges.forEach((edge: Edge) => {            
            if (edge.source === currentNodeID)
            {
                const nextNode: Node | undefined = currentNodes.find((node: Node) => node.id === edge.target);

                if (nextNode !== undefined)
                {
                    currentNodeID = nextNode.id;
                    if (nextNode.type === GoToTaskNode.typeLabel)
                    {
                        const connectedNode: GoToTaskNode = nextNode.data['self'] as GoToTaskNode;

                        if (connectedNode.isWaypointSelected())
                        {
                            validGoToTasks.push(connectedNode);
                        }
                    }
                }
            }
        });

        return validGoToTasks;
    };

    const nodes: Node[] = reactFlow.getNodes();
    const edges: Edge[] = reactFlow.getEdges();

    const stateUpdater = () => {
        const validGoToTasks: GoToTaskNode[] = getValidGoToTasks(nodes, edges);

        validGoToTasks.forEach((task: GoToTaskNode) => {
            const attachedEntity: MilitaryEntity = task.getAttachedEntity();

            attachedEntity.addGoToTask(task.getSelectedWaypointID());
        })
    };

    useEffect(stateUpdater, [applicationState.phase])

    return <></>
};

export default BehaviourEditorManager;