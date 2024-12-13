import { Dialog } from '@mui/material';
import React from 'react';

interface BehaviourEditorProperties
{
    open: boolean 
};

const BehaviourEditor: React.FC<BehaviourEditorProperties> = (properties: BehaviourEditorProperties) => {
    return <Dialog open={properties.open} fullScreen={true}>

    </Dialog>;
}

export default BehaviourEditor;