import React from "react";

import { ToggleButton } from "@mui/material";
import { Timeline } from "@mui/icons-material";

import { ActionButtonKind } from "./ActionButtons";

interface DefinePathButtonProperties {
    style?: React.CSSProperties;
}

const DefinePathButton: React.FC<DefinePathButtonProperties> = (properties: DefinePathButtonProperties) => {
    return <ToggleButton value={ActionButtonKind.DefinePath} style={properties.style} onClick={(event) => { event.stopPropagation(); }}>
        <Timeline />
    </ToggleButton>
};

export default DefinePathButton;