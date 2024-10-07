import React from "react";

import { ToggleButton } from "@mui/material";
import { AddLocation } from "@mui/icons-material";

import { ActionButtonKind } from "./ActionButtons";

interface AddWaypointButtonProperties {
    style?: React.CSSProperties;
}

const AddWaypointButton: React.FC<AddWaypointButtonProperties> = (properties: AddWaypointButtonProperties) => {
    return <ToggleButton value={ActionButtonKind.AddWaypoint} style={properties.style}>
        <AddLocation />
    </ToggleButton>
}

export default AddWaypointButton;