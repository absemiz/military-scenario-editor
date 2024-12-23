import { Button, SxProps, Theme } from "@mui/material";
import React, { useState } from "react";
import { useApplicationStateContext } from "../../hooks/useApplicationStateContext";
import { ApplicationPhase } from "../../contexts/ApplicationStateContext";

const style: SxProps<Theme> = {
    backgroundColor: "#3A3A3A",
    color: "#FFFFFF",
    textTransform: "none",
    fontWeight: 500,
    fontSize: "16px",
    padding: "8px 16px",
    marginTop: "24px",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#555555",
    },
    "&:active": {
      backgroundColor: "#777777",
    },
    transition: "background-color 0.3s",
}

const BehaviourEditorButton: React.FC = () => {
  const applicationState = useApplicationStateContext();

  const [buttonText, setButtonText] = useState("Open Behaviour Editor");

  const handleClick = () => {
    switch (applicationState.phase) {
      case ApplicationPhase.BehaviourEditorOpen:
        applicationState.setApplicationPhase(ApplicationPhase.ScenarioInitialization);
        setButtonText("Open Behaviour Editor");
        break;
      default:
        applicationState.setApplicationPhase(ApplicationPhase.BehaviourEditorOpen);
        setButtonText("Open Scenario Editor");
        break;
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="contained"
      sx={style}
    >
      {buttonText}
    </Button>
  );
};

export default BehaviourEditorButton;
