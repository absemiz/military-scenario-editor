import React from "react";

import { ToggleButtonGroup, ToggleButton } from "@mui/material";

import MilitarySymbolFactory from "../../utilities/military-symbol-factory";
import { Affiliation } from "../../types/entity";

import { useApplicationStateContext } from "../../hooks/useApplicationStateContext";
import { ApplicationState } from "../../contexts/ApplicationStateContext";

const factory: MilitarySymbolFactory = MilitarySymbolFactory.getInstance();

const defaultSymbols = {
    friend:  factory.getDefaultFriendSymbol(),
    hostile: factory.getDefaultHostileSymbol(),
    neutral: factory.getDefaultNeutralSymbol(),
    unknown: factory.getDefaultUnknownSymbol()
};

const selectedAffiliationStyle: React.CSSProperties = {
    backgroundColor: '#1DB954',
    color: 'white',
    fontWeight: 'bold',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    borderRadius: '4px',
};

const AffiliationSelection: React.FC = () => {
    const applicationState: ApplicationState = useApplicationStateContext();
    const [affiliation, setAffiliation] = React.useState<Affiliation | null>(Affiliation.Friend);

    const onChange = (
        event: React.MouseEvent<HTMLElement>,
        affiliation: Affiliation | null
    ) => {
        event.stopPropagation();
        if (affiliation !== null) 
        { 
            setAffiliation(affiliation); 
            applicationState.setSelectedAffiliation(affiliation);
        }
    }

    return <ToggleButtonGroup exclusive={true} value={affiliation} onChange={onChange}>
        <ToggleButton value={Affiliation.Friend} style={affiliation === Affiliation.Friend ? selectedAffiliationStyle : {}}>
        { defaultSymbols.friend }
        </ToggleButton>
        <ToggleButton value={Affiliation.Hostile} style={affiliation === Affiliation.Hostile ? selectedAffiliationStyle : {}}>
        { defaultSymbols.hostile }
        </ToggleButton>
        <ToggleButton value={Affiliation.Neutral} style={affiliation === Affiliation.Neutral ? selectedAffiliationStyle : {}}>
        { defaultSymbols.neutral }
        </ToggleButton>
        <ToggleButton value={Affiliation.Unknown} style={affiliation === Affiliation.Unknown ? selectedAffiliationStyle : {}}>
        { defaultSymbols.unknown }
        </ToggleButton>
    </ToggleButtonGroup>
}

export default AffiliationSelection;