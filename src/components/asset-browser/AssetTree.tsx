import React, { useEffect, useState } from "react";

import { Box } from "@mui/material";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";

import { useMap } from "react-leaflet";

import { IAssetTreeItem } from "../../types/asset-browser";
import MilitaryEntitiesDataService from "../../data/entities-data";
import { useApplicationStateContext } from "../../hooks/useApplicationStateContext";
import { ApplicationState } from "../../contexts/ApplicationStateContext";
import AssetTreeItem from "./AssetTreeItem";


const assetTreeContainerStyle: React.CSSProperties = {
    width: '100%',
    height: '400px',
    overflowY: 'auto',
    backgroundColor: '#1E1E1E',
    padding: '16px',
    color: 'white',
};

const militaryEntitiesDataService: MilitaryEntitiesDataService = MilitaryEntitiesDataService.getInstance();

interface AssetTreeProperties {
    setLastSelectedItem: React.Dispatch<React.SetStateAction<string | null>>;
}

const AssetTree: React.FC<AssetTreeProperties> = (properties: AssetTreeProperties) => {
    const applicationState: ApplicationState = useApplicationStateContext();
    const [assetTree, setAssetTree] = useState(militaryEntitiesDataService.treeOf(applicationState.selectedAffiliation));

    const map = useMap();

    const handleTreeContainerEnter = (event: React.MouseEvent) => {
        map.scrollWheelZoom.disable();
        event.stopPropagation();
    }

    const handleTreeContainerExit = (event: React.MouseEvent) => {
        map.scrollWheelZoom.enable();
        event.stopPropagation();
    }

    useEffect(
        () => { 
            const newTree = militaryEntitiesDataService.treeOf(applicationState.selectedAffiliation);
            setAssetTree(newTree);
        }, 
        [applicationState.selectedAffiliation]
    );

    const handleItemClick = (event: React.MouseEvent, itemId: string) => {
        if (!itemId.endsWith("root")) properties.setLastSelectedItem(itemId);
        event.stopPropagation();
    }

    return <Box sx={assetTreeContainerStyle} onMouseEnter={handleTreeContainerEnter} onMouseLeave={handleTreeContainerExit}>
        <SimpleTreeView onItemClick={handleItemClick}>
            { 
                assetTree.map((value: IAssetTreeItem, index: number) => (
                    <TreeItem itemId={value.id} label={value.label} key={index} slots={{icon: value.treeIcon}}>
                        { 
                            value.treeChildren.map((child: IAssetTreeItem, childIndex: number) => (
                                <AssetTreeItem item={child} key={childIndex} />
                            ))
                        }
                    </TreeItem>
                ))
            }
        </SimpleTreeView>
    </Box>;
}


export default AssetTree;