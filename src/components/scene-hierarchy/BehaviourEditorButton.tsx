import { Button } from "@mui/material";
import React, { useState } from "react";
import { useApplicationStateContext } from "../../hooks/useApplicationStateContext";
import { ApplicationPhase } from "../../contexts/ApplicationStateContext";

const BehaviourEditorButton: React.FC = () => {
    const applicationState = useApplicationStateContext();

    const [buttonText, setButtonText] = useState('Open Behaviour Editor');

    const handleClick = () => {
        switch (applicationState.phase)
        {
            case ApplicationPhase.ScenarioInitialization:
                applicationState.setApplicationPhase(ApplicationPhase.BehaviourEditorOpen);
                setButtonText('Open Behaviour Editor')
                break;
            case ApplicationPhase.BehaviourEditorOpen:
                applicationState.setApplicationPhase(ApplicationPhase.ScenarioInitialization);
                setButtonText('Open Scenario Editor')
                break;
            default:
                break;
        }
    };

    return <Button onClick={handleClick}>
        { buttonText }
    </Button>;
}

export default BehaviourEditorButton;