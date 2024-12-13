import React, { createContext, useState } from "react";

import { Affiliation } from "../types/entity";
import Path from "../models/path";

export enum ApplicationPhase {
    ScenarioInitialization,
    BehaviourEditorOpen,
    ScenarioInitializationRequestProcessing,
    ScenarioRun,
};

export interface AddWaypointState {
    active: boolean;
}

export interface DefinePathState {
    active: boolean;
    targetPath: Path | null;
}

export interface ApplicationState {
    phase: ApplicationPhase;
    selectedAffiliation: Affiliation;
    selectionEnabled: boolean;
    movingEnabled: boolean;
    addWaypointState: AddWaypointState;
    definePathState: DefinePathState;
    entityIDToDisplayAttributes: string | null,
    displayRepositioningInfo: boolean;

    setSelectedAffiliation: (newAffiliation: Affiliation) => void;
    setSelectionEnabled: (selectionState: boolean) => void;
    setMovingEnabled: (movingState: boolean) => void;
    setApplicationPhase: (newPhase: ApplicationPhase) => void;
    setAddWaypointState: (newState: AddWaypointState) => void;
    setDefinePathState: (newState: DefinePathState) => void;
    setDisplayRepositioningInfo: (newState: boolean) => void;
    setEntityIDToDisplayAttributes: (newState: string | null) => void;
};

export const ApplicationStateContext: React.Context<ApplicationState | undefined> = createContext<ApplicationState | undefined>(undefined);
export const ApplicationStateProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [applicationPhase, setApplicationPhase] = useState<ApplicationPhase>(ApplicationPhase.ScenarioInitialization);
    const [selectionEnabled, setSelectionEnabled] = useState<boolean>(true);
    const [movingEnabled, setMovingEnabled] = useState<boolean>(false);
    const [selectedAffiliation, setSelectedAffiliation] = useState<Affiliation>(Affiliation.Friend);
    const [addWaypointState, setAddWaypointState] = useState<AddWaypointState>({ active: false });
    const [definePathState, setDefinePathState] = useState<DefinePathState>({ active: false, targetPath: null });
    const [entityIDToDisplayAttributes, setEntityIDToDisplayAttributes] = useState<string | null>(null);
    const [displayRepositioningInfo, setDisplayRepositioningInfo] = useState<boolean>(false);

    return <ApplicationStateContext.Provider value={
        { 
            phase: applicationPhase, 
            selectedAffiliation: selectedAffiliation,
            selectionEnabled: selectionEnabled,
            movingEnabled: movingEnabled,
            addWaypointState: addWaypointState,
            definePathState: definePathState,
            entityIDToDisplayAttributes: entityIDToDisplayAttributes,
            displayRepositioningInfo: displayRepositioningInfo,

            setSelectedAffiliation: setSelectedAffiliation, 
            setSelectionEnabled: setSelectionEnabled,
            setMovingEnabled: setMovingEnabled,
            setApplicationPhase: setApplicationPhase,
            setAddWaypointState: setAddWaypointState,
            setDefinePathState: setDefinePathState,
            setEntityIDToDisplayAttributes: setEntityIDToDisplayAttributes,
            setDisplayRepositioningInfo: setDisplayRepositioningInfo
        }}>
        { children }
    </ApplicationStateContext.Provider>
}