import React from "react";

import { Typography } from "@mui/material";

import MilitarySymbolFactory from "../../utilities/military-symbol-factory";
import { useMapElementsContext } from "../../hooks/useMapElementsContext";
import MilitaryEntity from "../../models/military-entity";

const typographyStyle: React.CSSProperties = {
    color: '#D1D1D1',
    marginTop: '8px',
};

interface SelectedEntityTagProperties {
    selectedEntityID: string;
}

const SelectedEntityTag: React.FC<SelectedEntityTagProperties> = (properties: SelectedEntityTagProperties) => {
    const mapElements = useMapElementsContext();

    const entity = (mapElements.getRenderable(properties.selectedEntityID) as MilitaryEntity);
    
    return <React.Fragment>
        { MilitarySymbolFactory.getInstance().createReactComponent(entity.getSymbolicIdentificationCode()) }
        <Typography variant="h6" style={typographyStyle}>{ entity.getEntityCallsign() }</Typography>
        <Typography variant="body2" style={typographyStyle}>{ `${entity.getTypeName ? entity.getTypeName() : ''}/${entity.getSubTypeName ? entity.getSubTypeName() : ''}` }</Typography>
    </React.Fragment>
};

export default SelectedEntityTag;