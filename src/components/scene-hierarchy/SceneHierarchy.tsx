import React from "react";

import SceneHierarchyTree from "./SceneHierarchyTree";

import SelectedEntityAttributes from "./SelectedEntityAttributes";
import BehaviourEditorButton from "./BehaviourEditorButton";

import { useApplicationStateContext } from "../../hooks/useApplicationStateContext";
import { useMap } from "react-leaflet";

const sceneHierarchyContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '24px',
    width: '18vw',
    height: '100vh',
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    borderRadius: '0px 8px 8px 0px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
    zIndex: 5000,
    alignItems: 'center',
    overflow: 'hidden',
    boxSizing: 'border-box',
}

const sceneHierarchyHeaderStyle: React.CSSProperties = {
    marginBottom: '16px', 
    textAlign: 'center',
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
    paddingBottom: '8px',
}

const SceneHierarchy: React.FC = () => {
    const applicationContext = useApplicationStateContext();
    const map = useMap();

    const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = () => {
        map.scrollWheelZoom.disable();
        map.dragging.disable();
    }

    const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
        map.scrollWheelZoom.enable();
        map.dragging.enable();
    }

    return <div style={sceneHierarchyContainerStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <h2 style={sceneHierarchyHeaderStyle}>Scene Hierarchy</h2>
        <SceneHierarchyTree setLastSelectedItemID={applicationContext.setEntityIDToDisplayAttributes} />
        {applicationContext.entityIDToDisplayAttributes && <SelectedEntityAttributes />}
        {applicationContext.entityIDToDisplayAttributes && <BehaviourEditorButton />}
    </div>
}

export default SceneHierarchy;