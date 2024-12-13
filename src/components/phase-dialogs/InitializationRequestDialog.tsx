import React from 'react';

import { Dialog, DialogContent, Typography, CircularProgress, Box } from '@mui/material';

import { ApplicationPhase, ApplicationState } from "../../contexts/ApplicationStateContext";
import { useApplicationStateContext } from '../../hooks/useApplicationStateContext';

const InitializationRequestDialog: React.FC = () => {

    const applicationStateContext: ApplicationState = useApplicationStateContext();

    const isOpen: boolean = applicationStateContext.phase === ApplicationPhase.ScenarioInitializationRequestProcessing;

    return (
        <Dialog open={isOpen} aria-labelledby="initialization-dialog-title">
            <DialogContent>
                <Box display="flex" alignItems="center" flexDirection="column" gap={2} padding={2}>
                    <CircularProgress />
                    <Typography variant="h6">Simulator scene initializating...</Typography>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default InitializationRequestDialog;
