import React, { useEffect, useState } from "react";

import { Box, Divider,
    TableContainer, 
    Table, TableBody, TableRow, TableCell, 
    IconButton, Collapse, TextField, SxProps, Theme, InputAdornment
 } from "@mui/material";

import { KeyboardArrowDown, KeyboardArrowUp, Lock, LockOpen } from "@mui/icons-material";

import SelectedEntityTag from "./SelectedEntityTag";

import MilitaryEntity from "../../models/military-entity";
import { useApplicationStateContext } from "../../hooks/useApplicationStateContext";
import { useMapElementsContext } from "../../hooks/useMapElementsContext";
import { IMapRenderable } from "../../types/map";

const entityAttributesContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '16px',
    backgroundColor: '#1E1E1E',
    padding: '16px',
    color: '#FFFFFF',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: '480px',
    overflowY: 'auto'
}

const tableRowStyle: React.CSSProperties = {
    borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
    transition: 'background-color 0.3s ease',
    height: 36
};

const tableCellStyle: React.CSSProperties = {
    color: '#E0E0E0',
    padding: '12px 16px',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    textAlign: 'left'
};

const numericCellStyle: React.CSSProperties = {
    ...tableCellStyle,
    textAlign: 'right',
    fontFamily: 'monospace',
    fontWeight: 'bold',
};

const editableDataInputStyle: React.CSSProperties = {
    color: '#E0E0E0',
    backgroundColor: '#2e2e2e',
    borderRadius: 4,
    fontSize: '12px',
    padding: '4px 8px',
    borderColor: '#555',
};

const editableDataStyle: SxProps<Theme> = {
    color: '#E0E0E0',
    backgroundColor: '#2e2e2e',
    borderRadius: 1,
    fontSize: '10px',
    padding: '2px 4px',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#555',
        },
        '&:hover fieldset': {
            borderColor: '#888',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#E0E0E0',
        },
    },
};

const dataPostfixTable: Record<string, string> = {
    'Latitude': '\u00B0',
    'Longitude': '\u00B0',
    'Altitude': 'm',
    'Heading': '\u00B0',
    'Pitch': '\u00B0',
    'Roll': '\u00B0',

    'Max Speed': 'km/h',
    'Weight': 'kg',
    'Fuel': '%'
}

interface EntryProperties
{
    parameterKey: string;
    
    parameterValueGetter: () => string;
    parameterValueSetter?: (newValue: string) => void;
    parameterValuePostfix: string;
};

const evaluatePositionDataToDisplay: (entity: MilitaryEntity) => Array<EntryProperties> = (entity: MilitaryEntity) => {
    const positionData: Array<EntryProperties> = [
        {
            parameterKey: 'Latitude',
            parameterValueGetter: () => entity.getLatitude().toFixed(6),
            parameterValuePostfix: dataPostfixTable['Latitude'],
            parameterValueSetter: (newValue: string) => { 
                const inputLatitude: number = Number.parseFloat(newValue);
                if (!Number.isNaN(inputLatitude) && -90.0 <= inputLatitude && inputLatitude <= 90.0)
                {
                    entity.setLatitude(inputLatitude);
                } 
            }
        },
        {
            parameterKey: 'Longitude',
            parameterValueGetter: () => entity.getLongitude().toFixed(6),
            parameterValuePostfix: dataPostfixTable['Longitude'],
            parameterValueSetter: (newValue: string) => {
                const inputLongitude: number = Number.parseFloat(newValue);
                if (!Number.isNaN(inputLongitude) && -180.0 <= inputLongitude && inputLongitude <= 180.0)
                {
                    entity.setLongitude(Number.parseFloat(newValue));
                } 
            }
        },
        {
            parameterKey: 'Altitude',
            parameterValueGetter: () => entity.getAltitude().toFixed(6),
            parameterValuePostfix: dataPostfixTable['Altitude'],
            parameterValueSetter: (newValue: string) => {
                const inputAltitude: number = Number.parseFloat(newValue);
                if (!Number.isNaN(inputAltitude) && inputAltitude >= 0.0)
                {
                    entity.setAltitude(Number.parseFloat(newValue)); 
                }
            }
        },
        {
            parameterKey: 'Heading',
            parameterValueGetter:() => entity.getHeading().toFixed(6),
            parameterValuePostfix: dataPostfixTable['Heading'],
            parameterValueSetter: (newValue: string) => { 
                const inputHeading: number = Number.parseFloat(newValue);
                if (!Number.isNaN(inputHeading) && 0.0 <= inputHeading && inputHeading <= 360.0)
                {
                    entity.setHeading(Number.parseFloat(newValue));
                }
            }
        },
        { 
            parameterKey: 'Pitch',
            parameterValueGetter: () => entity.getPitch().toFixed(6),
            parameterValuePostfix: dataPostfixTable['Pitch'],
        },
        { 
            parameterKey: 'Roll',
            parameterValueGetter: () => entity.getRoll().toFixed(6),
            parameterValuePostfix: dataPostfixTable['Roll'],
        },
    ];

    return positionData;
}

const evaluatePlatformDataToDisplay: (entity: MilitaryEntity) => Array<EntryProperties> = (entity: MilitaryEntity) => {
    const platformData: Array<EntryProperties> = [
        {
            parameterKey: 'Max Speed',
            parameterValueGetter: () => { return entity.getMaxSpeed().toPrecision(3); },
            parameterValuePostfix: dataPostfixTable['Max Speed'],
        },
        {
            parameterKey: 'Weight',
            parameterValueGetter: () => { return entity.getWeight().toPrecision(5); },
            parameterValuePostfix: dataPostfixTable['Weight'],
        }
    ];

    if (entity.getFuel)
    {
        platformData.push(
            {
                parameterKey: 'Fuel',
                parameterValueGetter: () => entity.getFuel ? entity.getFuel().toFixed(0) : '',
                parameterValuePostfix: dataPostfixTable['Fuel'],
                parameterValueSetter: (newFuel: string) => {
                    const inputFuel: number = Number.parseFloat(newFuel);
                    if (!Number.isNaN(inputFuel) && 0.0 <= inputFuel && inputFuel <= 100.0)
                    {
                        if (entity.setFuel)
                        {
                            entity.setFuel(Number.parseFloat(newFuel))
                        };
                    }
                }
            }
        )
    }

    return platformData;
}

const nullPositionData: Array<EntryProperties> = [
    {
        parameterKey: 'Latitude',
        parameterValueGetter:() => '',
        parameterValuePostfix: dataPostfixTable['Latitude'],
    },
    {
        parameterKey: 'Longitude',
        parameterValueGetter: () => '',
        parameterValuePostfix: dataPostfixTable['Longitude'],
    },
    {
        parameterKey: 'Altitude',
        parameterValueGetter: () => '',
        parameterValuePostfix: dataPostfixTable['Altitude'],
    },
    {
        parameterKey: 'Heading',
        parameterValueGetter: () => '',
        parameterValuePostfix: dataPostfixTable['Heading'],
    },
    { 
        parameterKey: 'Pitch',
        parameterValueGetter:() => '',
        parameterValuePostfix: dataPostfixTable['Pitch'],
    },
    { 
        parameterKey: 'Roll',
        parameterValueGetter: () => '',
        parameterValuePostfix: dataPostfixTable['Roll'],
    },
];

const nullPlatformData: Array<EntryProperties> = [
    {
        parameterKey: 'Max Speed',
        parameterValueGetter:() => '',
        parameterValuePostfix: dataPostfixTable['Max Speed'],
    },
    {
        parameterKey: 'Weight',
        parameterValueGetter: () => '',
        parameterValuePostfix: dataPostfixTable['Weight'],
    }
];

const SelectedEntityAttributes: React.FC = () => {

    const applicationState = useApplicationStateContext();
    const mapElements = useMapElementsContext();

    const [lastDisplayedEntity, setLastDisplayedEntity] = useState<MilitaryEntity | null>(null);

    const [positionData, setPositionData] = useState<Array<EntryProperties>>(nullPositionData);
    const [platformData, setPlatformData] = useState<Array<EntryProperties>>(nullPlatformData);

    const [expandPositionData, setExpandPositionData] = useState<boolean>(false);
    const [expandPlatformData, setExpandPlatformData] = useState<boolean>(false);


    const ValueComponent: React.FC<EntryProperties> = (properties: EntryProperties) => {    
        const [temporaryValue, setTemporaryValue] = useState<string>(properties.parameterValueGetter());
    
        const handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (properties.parameterValueSetter)
            {
                setTemporaryValue(event.target.value)
            }
        };
    
        const handleBlur = () => {
            if (properties.parameterValueSetter && lastDisplayedEntity)
            {
                properties.parameterValueSetter(temporaryValue);
                mapElements.updateRenderable(lastDisplayedEntity.mapID(), lastDisplayedEntity)
            }
        };

        const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter' && properties.parameterValueSetter && lastDisplayedEntity) 
            {
                properties.parameterValueSetter(temporaryValue);
                mapElements.updateRenderable(lastDisplayedEntity.mapID(), lastDisplayedEntity)
            }
        };
    
        const valueChangeCallback = () => {
            setTemporaryValue(properties.parameterValueGetter());
        };
    
        useEffect(valueChangeCallback, [properties.parameterValueGetter()]);
    
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleEnter}
                size="small"
                sx={editableDataStyle}
                value={temporaryValue}
                slotProps={{ input: { 
                        style: editableDataInputStyle, 
                        readOnly: properties.parameterValueSetter === undefined, 
                        endAdornment: (
                            <InputAdornment position="end">
                                {properties.parameterValueSetter ? 
                                    <LockOpen sx={{ fontSize: '8px', color: '#FFFFFF' }} /> : 
                                    <Lock sx={{ fontSize: '8px', color: '#FFFFFF' }} />
                                }
                            </InputAdornment>
                        ),
                    } 
                }}
                />
                <span>{properties.parameterValuePostfix}</span>
            </div>
        );
    };
    
    const ExpandableTable: (name: string, values: Array<EntryProperties>, expand: boolean, setExpand: (expand: boolean) => void) => 
        React.ReactNode = (name: string, values: Array<EntryProperties>, expand: boolean, setExpand: (newExpand: boolean) => void) => {
        return (
            <React.Fragment>
                <TableRow key={name} hover={true} style={tableRowStyle}>
                    <TableCell style={{ ...tableCellStyle, padding: '4px 8px' }}>
                        <IconButton sx={{ color: '#FFFFFF' }} size="small" onClick={() => { setExpand(!expand) }}>
                            {expand ? <KeyboardArrowUp fontSize="small" /> : <KeyboardArrowDown fontSize="small" />}
                        </IconButton>
                    </TableCell>
                    <TableCell style={{ ...tableCellStyle, padding: '4px 8px' }} align="left" >{name}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
                        <Collapse in={expand} timeout="auto" unmountOnExit={true}>
                            <Table>
                                <TableBody>
                                    {values.map((entryProperties, index) => (
                                        <TableRow key={index} style={tableRowStyle}>
                                            <TableCell style={tableCellStyle}>{entryProperties.parameterKey}</TableCell>
                                            <TableCell style={numericCellStyle}>
                                                { <ValueComponent {...entryProperties}/> }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    };

    useEffect(
        () => {
            if (applicationState.entityIDToDisplayAttributes === null) 
            { 
                setPositionData(nullPositionData);
                setPlatformData(nullPlatformData); 
            }
            else
            {
                const entityRenderable: IMapRenderable | undefined = mapElements.getRenderable(applicationState.entityIDToDisplayAttributes);

                if (entityRenderable === undefined) 
                { 
                    setPositionData(nullPositionData);
                    setPlatformData(nullPlatformData); 
                }
                else 
                {
                    const militaryEntity = entityRenderable as MilitaryEntity;
                    setPositionData(evaluatePositionDataToDisplay(militaryEntity));
                    setPlatformData(evaluatePlatformDataToDisplay(militaryEntity))
                    setLastDisplayedEntity(militaryEntity);
                }
            }
        }, 
        [
            applicationState.entityIDToDisplayAttributes,
            lastDisplayedEntity?.getLatitude(),
            lastDisplayedEntity?.getLongitude(),
            lastDisplayedEntity?.getAltitude(),
            lastDisplayedEntity?.getHeading(),
            lastDisplayedEntity?.getFuel
        ]
    );

    return <Box style={entityAttributesContainerStyle}>
        { applicationState.entityIDToDisplayAttributes && <SelectedEntityTag selectedEntityID={applicationState.entityIDToDisplayAttributes} /> }
        <Divider style={{ margin: '8px 0' }} />
        <TableContainer>
            <Table>
                <TableBody>
                    { ExpandableTable('Position', positionData, expandPositionData, setExpandPositionData) }
                    { ExpandableTable('Platform', platformData, expandPlatformData, setExpandPlatformData) }
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
}

export default SelectedEntityAttributes;