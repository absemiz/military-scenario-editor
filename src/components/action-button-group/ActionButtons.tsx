import React, { useState, useEffect } from "react";

import { ToggleButtonGroup } from "@mui/material";

import AddWaypointButton from "./AddWaypointButton";
import DefinePathButton from "./DefinePathButton";

import Path from "../../models/path";

import { useApplicationStateContext } from "../../hooks/useApplicationStateContext";
import { useMapElementsContext } from "../../hooks/useMapElementsContext";

const actionButtonsContainerStyle: React.CSSProperties =  {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    marginTop: "10px",
    zIndex: 5000,
    backgroundColor: "#333",
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
    padding: "5px"
};
const actionButtonStyle: React.CSSProperties = {
    padding: "8px",
    color: "#1DB954",
    borderRadius: "4px",
};

const selectedActionButtonStyle: React.CSSProperties = {
    padding: "8px",
    color: "#FFFFFF",
    backgroundColor: "#1DB954",
    borderRadius: "4px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
    transition: "background-color 0.3s, color 0.3s",
    fontWeight: 600,
}

export enum ActionButtonKind {
    AddWaypoint,
    DefinePath
}

const ActionButtons: React.FC = () => {
    const applicationState = useApplicationStateContext();
    const mapElements = useMapElementsContext();

    const [selected, setSelected] = useState<ActionButtonKind | null>(null);

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        buttonKind: ActionButtonKind | null
    ) => {
            setSelected(buttonKind);
            event.stopPropagation();
    };

    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
        applicationState.setAddWaypointState({ active: false });
        applicationState.setDefinePathState({ active: false, targetPath: null });
        event.stopPropagation();
    }

    const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
        switch (selected) {
            case ActionButtonKind.AddWaypoint:
                applicationState.setAddWaypointState({ active: true });
                break;
            case ActionButtonKind.DefinePath:
                const targetPath: Path = new Path();
                mapElements.addRenderable(targetPath);
                applicationState.setDefinePathState({ active: true, targetPath: targetPath })
                break;
            default:
                break;
        }
        event.stopPropagation();
    }

    useEffect(() => { if (selected === ActionButtonKind.AddWaypoint && !applicationState.addWaypointState.active) setSelected(null); }, [applicationState.addWaypointState.active]);
    useEffect(() => { if (selected === ActionButtonKind.DefinePath && !applicationState.definePathState.active) setSelected(null); }, [applicationState.definePathState.active]);

    return <ToggleButtonGroup exclusive={true} value={selected} onChange={handleChange} style={actionButtonsContainerStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <AddWaypointButton style={selected === ActionButtonKind.AddWaypoint ? selectedActionButtonStyle : actionButtonStyle}/>
        <DefinePathButton style={selected === ActionButtonKind.DefinePath ? selectedActionButtonStyle : actionButtonStyle} />
    </ToggleButtonGroup>
}

export default ActionButtons;