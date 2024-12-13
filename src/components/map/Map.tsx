import React from "react";
import { MapContainer, TileLayer}  from "react-leaflet";

import 'leaflet/dist/leaflet.css'

import { IMapRenderable } from "../../types/map";

import AssetBrowser from "../asset-browser/AssetBrowser";
import ActionButtons from "../action-button-group/ActionButtons";
import SceneHierarchy from "../scene-hierarchy/SceneHierarchy";
import InitializationRequestDialog from '../phase-dialogs/InitializationRequestDialog.tsx';

import { useMapElementsContext } from "../../hooks/useMapElementsContext";
import { useApplicationStateContext } from "../../hooks/useApplicationStateContext";

import { Alert } from "@mui/material";

import MapManager from "./MapManager";

const alertStyle: React.CSSProperties = {
  position: 'absolute', 
  bottom: '10px',      
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10000, 
}

const Map: React.FC = () => {
    const mapElementsContext = useMapElementsContext();
    const applicationState = useApplicationStateContext();

    if (!mapElementsContext) throw new Error("Null mapElementsOnContext");

    const renderables: IMapRenderable[] = mapElementsContext.renderables;
    
    return (
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} doubleClickZoom={false} zoomControl={false}>
            <MapManager />
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <ActionButtons />
            <SceneHierarchy />
            <AssetBrowser />
            <InitializationRequestDialog />
            { renderables.map((renderable, index) => (<React.Fragment key={renderable.mapID(index)}>{renderable.mapComponent()}</React.Fragment>)) }
            { applicationState.addWaypointState.active && <Alert style={alertStyle} severity="info">Left-click on the map to add a waypoint.</Alert> }
            { applicationState.definePathState.active && <Alert style={alertStyle} severity="info">Left-click to create a path. Right-click to complete.</Alert> }
            { applicationState.displayRepositioningInfo && <Alert style={alertStyle} severity="info">Entities can be repositioned through drag-and-drop functionality after they have been added to the map.</Alert> }
        </MapContainer>
      );
}

export default Map;