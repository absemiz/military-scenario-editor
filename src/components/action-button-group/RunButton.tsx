import React from "react";

import { ToggleButton } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";

import { ActionButtonKind } from "./ActionButtons";

interface RunButtonProperties
{
    style?: React.CSSProperties
};

const RunButton: React.FC<RunButtonProperties> = (properties: RunButtonProperties) => {
    return <ToggleButton value={ActionButtonKind.Run} style={properties.style} onClick={(event) => { event.stopPropagation(); }}><PlayArrow /></ToggleButton>
}

export default RunButton;