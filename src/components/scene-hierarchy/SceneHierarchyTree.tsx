import React, { useMemo } from "react";

import { Box } from "@mui/material";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";

import { useMapElementsContext } from "../../hooks/useMapElementsContext";
import { IMapRenderable } from "../../types/map";
import { IAssetTreeItem } from "../../types/asset-browser";
import MilitaryEntity from "../../models/military-entity";
import { Affiliation } from "../../types/entity";
import { ExpandMore } from "@mui/icons-material";
import SceneHierarchyTreeItem from "./SceneHierarchyTreeItem";

interface SceneHierarchyTreeProperties {
    setLastSelectedItem?: React.Dispatch<React.SetStateAction<string | null>>;
};

const sceneHierarchyTreeStyle: React.CSSProperties = {
    width: '100%',
    height: '480px',
    overflowY: 'auto',
    backgroundColor: '#1E1E1E',
    padding: '16px',
    color: 'white',
}

const SceneHierarchyTree: React.FC<SceneHierarchyTreeProperties> = (_properties: SceneHierarchyTreeProperties) => {
    const mapElements = useMapElementsContext(); 

    const hierarchyTreeFactory: (() => IAssetTreeItem[]) = () => {
        return [
            {
                id: 'blueforce-root',
                label: 'Blueforce',
                treeIcon: () => <ExpandMore />,
                treeChildren: mapElements.renderables
                    .filter((renderable: IMapRenderable) => 
                        (renderable instanceof MilitaryEntity) && (renderable.affiliation === Affiliation.Friend)
                    )
                    .map((militaryRenderable: IMapRenderable) => {
                        const militaryEntity: MilitaryEntity = militaryRenderable as MilitaryEntity;
                        return {
                            id: militaryEntity.mapID(undefined),
                            label: militaryEntity.callsign,
                            treeChildren: [],
                            treeIcon: militaryEntity.treeIcon
                        };
                    })
            },
            {
                id: 'redforce-root',
                label: 'Redforce',
                treeIcon: () => <ExpandMore />,
                treeChildren: mapElements.renderables
                    .filter((renderable: IMapRenderable) => 
                        (renderable instanceof MilitaryEntity) && (renderable.affiliation === Affiliation.Hostile)
                    )
                    .map((militaryRenderable: IMapRenderable) => {
                        const militaryEntity: MilitaryEntity = militaryRenderable as MilitaryEntity;
                        return {
                            id: militaryEntity.mapID(undefined),
                            label: militaryEntity.callsign,
                            treeChildren: [],
                            treeIcon: militaryEntity.treeIcon
                        };
                    })
            }
        ];
    };

    const hierarchyTree: IAssetTreeItem[] = useMemo(hierarchyTreeFactory, [mapElements.renderables]);

    return <Box style={sceneHierarchyTreeStyle}>
        <SimpleTreeView onItemClick={() => {}}>
            { 
                hierarchyTree.map((value: IAssetTreeItem, index: number) => (
                    <TreeItem itemId={value.id} label={value.label} key={index} slots={{icon: value.treeIcon}}>
                        { 
                            value.treeChildren.map((child: IAssetTreeItem, childIndex: number) => (
                                <SceneHierarchyTreeItem item={child} key={childIndex} />
                            ))
                        }
                    </TreeItem>
                ))
            }
        </SimpleTreeView>
    </Box>
}

export default SceneHierarchyTree;