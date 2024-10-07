import React from "react";

import { useMapEvent } from "react-leaflet";
import { useApplicationStateContext } from "../../hooks/useApplicationStateContext";
import { useMapElementsContext } from "../../hooks/useMapElementsContext";
import { LeafletMouseEvent, LeafletMouseEventHandlerFn } from "leaflet";

import Waypoint from "../../models/waypoint";

const MapManager: React.FC = () => {
    const applicationState = useApplicationStateContext();
    const mapElements = useMapElementsContext();

    const handleMouseMove: LeafletMouseEventHandlerFn = (_event: LeafletMouseEvent) => {
        /*if (applicationState.addWaypointState.active) {
            applicationState.setAddWaypointState({ active: true });
        }*/
    };

    const handleClick: LeafletMouseEventHandlerFn = (event: LeafletMouseEvent) => {
        if (applicationState.addWaypointState.active) {
            const waypointToAdd = new Waypoint([event.latlng.lat, event.latlng.lng]);

            mapElements.addRenderable(waypointToAdd);

            applicationState.setAddWaypointState({ active: false })
        }
        if (applicationState.definePathState.active) {
            if (!applicationState.definePathState.targetPath) throw new Error("Invalid Path object.");
            applicationState.definePathState.targetPath.addPoint([event.latlng.lat, event.latlng.lng]);
            mapElements.updateRenderable(applicationState.definePathState.targetPath.mapID(undefined), applicationState.definePathState.targetPath);
        }
    };

    const handleRightClick: LeafletMouseEventHandlerFn = (_event: LeafletMouseEvent) => {
        if (applicationState.definePathState.active) {
            //event.originalEvent.preventDefault();
            applicationState.setDefinePathState({active: false, targetPath: null});
        }
    }

    useMapEvent("click", handleClick);
    useMapEvent("mousemove", handleMouseMove);
    useMapEvent("contextmenu", handleRightClick);

    return <></>
}

export default MapManager;