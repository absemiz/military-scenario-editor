import React from "react";

import { ToggleButton } from "@mui/material";
import { OpenWith } from "@mui/icons-material";

import { ActionButtonKind } from "./ActionButtons";

interface SelectButtonProperties
{
    style?: React.CSSProperties;
};

const MoveButton: React.FC<SelectButtonProperties> = (properties: SelectButtonProperties) => {
    return <ToggleButton value={ActionButtonKind.Move} style={properties.style} onClick={(event) => { event.stopPropagation(); }}>
        <OpenWith />
    </ToggleButton>
}

export default MoveButton;