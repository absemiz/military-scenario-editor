import React, { createContext, useState } from "react";

import { Affiliation } from "../types/entity";
import Path from "../models/path";

export enum ApplicationPhase {
    Initialization,
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
    addWaypointState: AddWaypointState;
    definePathState: DefinePathState;
    displayRepositioningInfo: boolean;

    setSelectedAffiliation: (newAffiliation: Affiliation) => void;
    setApplicationPhase: (newPhase: ApplicationPhase) => void;
    setAddWaypointState: (newState: AddWaypointState) => void;
    setDefinePathState: (newState: DefinePathState) => void;
    setDisplayRepositioningInfo: (newState: boolean) => void;
};

export const ApplicationStateContext: React.Context<ApplicationState | undefined> = createContext<ApplicationState | undefined>(undefined);
export const ApplicationStateProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [applicationPhase, setApplicationPhase] = useState<ApplicationPhase>(ApplicationPhase.Initialization);
    const [selectedAffiliation, setSelectedAffiliation] = useState<Affiliation>(Affiliation.Friend);
    const [addWaypointState, setAddWaypointState] = useState<AddWaypointState>({ active: false });
    const [definePathState, setDefinePathState] = useState<DefinePathState>({ active: false, targetPath: null });
    const [displayRepositioningInfo, setDisplayRepositioningInfo] = useState<boolean>(false);

    return <ApplicationStateContext.Provider value={
        { 
            phase: applicationPhase, 
            selectedAffiliation: selectedAffiliation,
            addWaypointState: addWaypointState,
            definePathState: definePathState,
            displayRepositioningInfo: displayRepositioningInfo,
            setSelectedAffiliation: setSelectedAffiliation, 
            setApplicationPhase: setApplicationPhase,
            setAddWaypointState: setAddWaypointState, 
            setDefinePathState: setDefinePathState,
            setDisplayRepositioningInfo: setDisplayRepositioningInfo
        }}>
        { children }
    </ApplicationStateContext.Provider>
}