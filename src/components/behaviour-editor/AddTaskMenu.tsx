import React from "react";

import { Menu, MenuItem } from "@mui/material";
import { useReactFlow, XYPosition } from "@xyflow/react";

interface AddTaskMenuProperties
{
    open: boolean;
    position: {mouseX: number, mouseY: number} | null;

    onClose: () => void;

    addGoToWaypointTaskNode?: (editorPosition: XYPosition) => void;
};

const AddTaskMenu: React.FC<AddTaskMenuProperties> = (properties: AddTaskMenuProperties) => 
{
    const reactFlow = useReactFlow();

    const handleGoToWaypoint = () => {
        if (properties.addGoToWaypointTaskNode !== undefined && properties.position !== null)
        {
            const editorPosition: XYPosition = reactFlow.screenToFlowPosition({ x: properties.position.mouseX, y: properties.position.mouseY })

            properties.addGoToWaypointTaskNode(editorPosition);
            properties.onClose();
        }
    }

    return <Menu open={properties.open} anchorReference="anchorPosition" anchorPosition={properties.position ? {top: properties.position.mouseY, left: properties.position.mouseX} : undefined}>
        <MenuItem onClick={handleGoToWaypoint}>Go To Waypoint</MenuItem>
        <MenuItem>Follow Path</MenuItem>
    </Menu>
};

export default AddTaskMenu;