import React, { useState, useEffect } from "react";

import { ToggleButtonGroup } from "@mui/material";

import AddWaypointButton from "./AddWaypointButton";
import DefinePathButton from "./DefinePathButton";
import SelectButton from "./SelectButton";
import MoveButton from "./MoveButton";
import RunButton from "./RunButton";

import Path from "../../models/path";

import { useApplicationStateContext } from "../../hooks/useApplicationStateContext";
import { useMapElementsContext } from "../../hooks/useMapElementsContext";

import { IMapRenderable } from "../../types/map";
import MilitaryEntity from "../../models/military-entity";
import Waypoint from "../../models/waypoint";

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
};

export enum ActionButtonKind {
    AddWaypoint,
    DefinePath,
    Select,
    Move,
    Run,
};

const ActionButtons: React.FC = () => {
    const applicationState = useApplicationStateContext();
    const mapElements = useMapElementsContext();

    const [selected, setSelected] = useState<ActionButtonKind | null>(ActionButtonKind.Select);

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        buttonKind: ActionButtonKind | null
    ) => {
        if (buttonKind !== null)
        {
            if (buttonKind !== ActionButtonKind.Move) 
            {
                applicationState.setMovingEnabled(false);
            }
            setSelected(buttonKind);
            event.stopPropagation();
        } 
    };

    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
        applicationState.setAddWaypointState({ active: false });
        applicationState.setDefinePathState({ active: false, targetPath: null });
        event.stopPropagation();
    }

    const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
        switch (selected) {
            case ActionButtonKind.Select:
                applicationState.setSelectionEnabled(true);
                break;
            case ActionButtonKind.Move:
                applicationState.setMovingEnabled(true);
                break;
            case ActionButtonKind.AddWaypoint:
                applicationState.setAddWaypointState({ active: true });
                break;
            case ActionButtonKind.DefinePath:
                const targetPath: Path = new Path();
                mapElements.addRenderable(targetPath);
                applicationState.setDefinePathState({ active: true, targetPath: targetPath })
                break;
            case ActionButtonKind.Run:
                const filterOf = (mapIDPreamble: string) => {
                    return function (mapRenderable: IMapRenderable) {
                        return mapRenderable.mapID().startsWith(mapIDPreamble);
                    };
                }

                const militaryEntities: MilitaryEntity[] = mapElements.renderables.filter(filterOf('milentity')) as MilitaryEntity[];
                const paths: Path[] = mapElements.renderables.filter(filterOf('path')) as Path[];
                const waypoints: Waypoint[] = mapElements.renderables.filter(filterOf('waypoint')) as Waypoint[];

                const initializationMessage = {
                    entities: militaryEntities.map((value: MilitaryEntity) => value.asJSON()),
                    paths: paths.map((value: Path) => value.asJSON()),
                    waypoints: waypoints.map((value: Waypoint) => value.asJSON())
                };

                console.log(JSON.stringify(initializationMessage));

                fetch(
                    'http://localhost:8080/milsimapi',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Message-Kind': 'scenario/initialize',
                        },
                        body: JSON.stringify(initializationMessage)
                    }
                )
                .then((response => console.log(response.json())))
                .then(responseData => console.log(responseData))
                .catch(error => console.log(error));

                break;
            default:
                break;
        }
        event.stopPropagation();
    }

    useEffect(() => { if (selected === ActionButtonKind.AddWaypoint && !applicationState.addWaypointState.active) setSelected(null); }, [applicationState.addWaypointState.active]);
    useEffect(() => { if (selected === ActionButtonKind.DefinePath && !applicationState.definePathState.active) setSelected(null); }, [applicationState.definePathState.active]);

    return <ToggleButtonGroup exclusive={true} value={selected} onChange={handleChange} style={actionButtonsContainerStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <SelectButton style={selected === ActionButtonKind.Select ? selectedActionButtonStyle : actionButtonStyle}/>
        <MoveButton style={selected === ActionButtonKind.Move ? selectedActionButtonStyle : actionButtonStyle}/>
        <AddWaypointButton style={selected === ActionButtonKind.AddWaypoint ? selectedActionButtonStyle : actionButtonStyle}/>
        <DefinePathButton style={selected === ActionButtonKind.DefinePath ? selectedActionButtonStyle : actionButtonStyle} />
        <RunButton style={selected === ActionButtonKind.Run ? selectedActionButtonStyle : actionButtonStyle}></RunButton>
    </ToggleButtonGroup>
}

export default ActionButtons;