import React from "react";

import { ToggleButton } from "@mui/material";
import { TouchApp } from "@mui/icons-material";

import { ActionButtonKind } from "./ActionButtons";

interface SelectButtonProperties
{
    style?: React.CSSProperties;
};

const SelectButton: React.FC<SelectButtonProperties> = (properties: SelectButtonProperties) => {
    return <ToggleButton value={ActionButtonKind.Select} style={properties.style} onClick={(event) => { event.stopPropagation(); }}>
        <TouchApp />
    </ToggleButton>
}

export default SelectButton;