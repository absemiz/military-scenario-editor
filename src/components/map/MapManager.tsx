import React, { useEffect } from "react";

import { useMapEvent } from "react-leaflet";
import { useApplicationStateContext } from "../../hooks/useApplicationStateContext";
import { useMapElementsContext } from "../../hooks/useMapElementsContext";
import { LeafletMouseEvent, LeafletMouseEventHandlerFn } from "leaflet";
import RequestManager from "../../utilities/request-manager";

import { EntityMessageObject } from "../../types/entity";


import Waypoint from "../../models/waypoint";
import MilitaryEntity from "../../models/military-entity";
import { ApplicationPhase } from "../../contexts/ApplicationStateContext";

const MapManager: React.FC = () => {
    const applicationState = useApplicationStateContext();
    const mapElements = useMapElementsContext();

    useEffect(() => { 
        const fetchEntitiesState = async () => {
            try
            {
                const response: Response = await fetch(RequestManager.getInstance().getUpdateStateRequest());
                const stateData: object = await response.json();

                const structuredStateData = (stateData as { entities: EntityMessageObject[] });

                console.log(`Update State Response: ${structuredStateData}`);

                structuredStateData.entities.forEach(
                    (upToDateEntityState: EntityMessageObject) => {
                        const targetEntity: MilitaryEntity | undefined = mapElements.getRenderable(upToDateEntityState.id) as MilitaryEntity;

                        if (targetEntity === undefined)
                        {
                            throw Error(`Invalid state for entity: ${upToDateEntityState}`);
                        }

                        targetEntity.setLatitude(upToDateEntityState.latitude);
                        targetEntity.setLongitude(upToDateEntityState.longitude)
                        targetEntity.setAltitude(upToDateEntityState.altitude);
                        targetEntity.setHeading(upToDateEntityState.heading);

                        mapElements.updateRenderable(upToDateEntityState.id, targetEntity);
                    }
                );
            }
            catch (fetchError)
            {
                console.log(`Entities state updated failed: ${fetchError}`)
            }
        };

        if (applicationState.phase === ApplicationPhase.ScenarioRun)
        {
            fetchEntitiesState();

            const fetchIntervalID: number = setInterval(fetchEntitiesState, 5000);
    
            return () => clearInterval(fetchIntervalID);
        }
    }, 
    [mapElements.updateRenderable, applicationState.phase]
    );

    const handleClick: LeafletMouseEventHandlerFn = (event: LeafletMouseEvent) => {
        if (applicationState.addWaypointState.active) {
            const waypointToAdd = new Waypoint([event.latlng.lat, event.latlng.lng]);

            mapElements.addRenderable(waypointToAdd);

            applicationState.setAddWaypointState({ active: false })
        }
        if (applicationState.definePathState.active) {
            if (!applicationState.definePathState.targetPath) throw new Error("Invalid Path object.");
            applicationState.definePathState.targetPath.addPoint([event.latlng.lat, event.latlng.lng]);
            mapElements.updateRenderable(applicationState.definePathState.targetPath.mapID(), applicationState.definePathState.targetPath);
        }
    };

    const handleRightClick: LeafletMouseEventHandlerFn = (_event: LeafletMouseEvent) => {
        if (applicationState.definePathState.active) {
            applicationState.setDefinePathState({active: false, targetPath: null});
        }
    }

    useMapEvent("click", handleClick);
    useMapEvent("contextmenu", handleRightClick);

    return <></>
}

export default MapManager;