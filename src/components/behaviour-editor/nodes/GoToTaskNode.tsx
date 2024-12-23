import React, { useMemo } from "react";
import IBehaviourEditorComponent from "../types/behaviour-editor-component";
import MilitaryEntity from "../../../models/military-entity";
import Waypoint from "../../../models/waypoint";

import {Autocomplete, Typography, TextField } from "@mui/material";

import { Handle, Node, NodeProps, Position, XYPosition} from "@xyflow/react";

import { GoToPointTask } from "../../../contexts/ApplicationStateContext";

import { useMapElementsContext } from "../../../hooks/useMapElementsContext";
import { IMapRenderable } from "../../../types/map";

class GoToTaskNode implements IBehaviourEditorComponent
{
    private static instanceCounter: number = 0;

    public static readonly typeLabel: string = "goToTask";

    private mAttachedEntity: MilitaryEntity;
    private mSelectedWaypoint: Waypoint | null;

    private mPosition: XYPosition;

    private mID: string;

    public static nodeStyle: React.CSSProperties = {
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
    };

    public constructor(attachedEntity: MilitaryEntity, position: XYPosition = { x: 0, y: 0 })
    {
        this.mAttachedEntity = attachedEntity;
        this.mSelectedWaypoint = null;

        this.mPosition = position;

        this.mID = `go-to-task@${this.mAttachedEntity.mapID()}@${GoToTaskNode.instanceCounter.toString()}`;

        GoToTaskNode.instanceCounter++;
    }

    public getAttachedEntity(): MilitaryEntity
    {
        return this.mAttachedEntity;
    }

    public getSelectedWaypointID(): string
    {
        if (this.mSelectedWaypoint === null)
        {
            throw Error("A waypoint must selected to convert task.");
        }

        return this.mSelectedWaypoint.mapID();
    }

    public toAPIMessage(): GoToPointTask {

        if (this.mSelectedWaypoint)
        {
            const waypointCoordinates: [number, number] = this.mSelectedWaypoint.mapPosition();

            return {
                attachedEntityID: this.mAttachedEntity.mapID(),
                latitude: waypointCoordinates[0],
                longitude: waypointCoordinates[1],
                altitude: 0
            };
        }
        else
        {
            throw Error("Waypoint must be selected before sending message.");
        }
    }

    public getNodeData(): Node {
        return {
            'id': this.getBehaviourEditorComponentID(),
            'position': this.getBehaviourEditorComponentPosition(),
            'type': GoToTaskNode.typeLabel,
            'data': { 'self': this.getBehaviourEditorData()}
        }
    }

    public getBehaviourEditorData(): any {
        return this;
    }
    
    public getBehaviourEditorComponentPosition(): XYPosition
    {
        return this.mPosition
    }

    public setBehaviourEditorComponentPosition(position: XYPosition): void
    {
        this.mPosition = position;
    }
    
    public getBehaviourEditorComponentID(): string 
    {
        return this.mID;
    }

    public setSelectedWaypoint(waypoint: Waypoint): void
    {
        this.mSelectedWaypoint = waypoint;
    }

    public isWaypointSelected(): boolean {
        return this.mSelectedWaypoint !== null;
    }

    public getSelectedWaypointLabel(): string 
    {
        if (this.mSelectedWaypoint !== null)
        {
            return this.mSelectedWaypoint.getAssetTreeLabel();
        }
        else
        {
            return '';
        }
    }

    public static BehaviourEditorComponent(properties: NodeProps): React.ReactElement
    {
        const self: GoToTaskNode = properties.data.self as GoToTaskNode;

        const mapElements = useMapElementsContext();

        const waypointFilter = () => {
            return mapElements.renderables.filter((element: IMapRenderable) => element.mapID().startsWith('waypoint')) as Waypoint[];
        };

        const waypoints: Waypoint[] = useMemo(
            waypointFilter,
            [mapElements.renderables]
        );

        const waypointLabelMapper = (waypoint: Waypoint) => {
            return waypoint.getAssetTreeLabel();
        };

        const handleChange = (event: React.SyntheticEvent, newValue: string | null) => 
        {
            if (newValue !== null) 
            {
                const selectedWaypointObject: Waypoint = mapElements.getRenderable(newValue.toLowerCase()) as Waypoint;

                if (selectedWaypointObject !== undefined)
                {
                    self.setSelectedWaypoint(selectedWaypointObject);
                }
            }

            event.stopPropagation();
        };

        return (
            <div style={GoToTaskNode.nodeStyle}>
                <Handle id={`${self.getBehaviourEditorComponentID()}@flow-in`} type="target" position={Position.Left} />
                <Handle id={`${self.getBehaviourEditorComponentID()}@flow-out`} type="source" position={Position.Right} />

                <Typography variant="h5" style={{ color: '#1976d2', fontWeight: 'bold' }}>
                    {`Add Go To Waypoint Task`}
                </Typography>

                <Typography variant="h6" style={{ color: '#1976d2', fontWeight: 'normal' }}>
                    {`Attached Entity: ${self.mAttachedEntity.getHierarchyTreeLabel()}`}
                </Typography>

                <Autocomplete
                options={waypoints.map(waypointLabelMapper)}
                onChange={handleChange}
                value={self.getSelectedWaypointLabel()}
                renderInput={(parameters) => <TextField {...parameters} label="Select Waypoint" variant="outlined" />}
                fullWidth
                sx={{
                    '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    background: '#fff',
                    },
                }}
                />
            </div>
        );
    }
}

export default GoToTaskNode;