import React, { useMemo } from "react";

import { Box } from "@mui/material";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";

import { useMapElementsContext } from "../../hooks/useMapElementsContext";
import { IMapRenderable } from "../../types/map";
import MilitaryEntity from "../../models/military-entity";
import { Affiliation } from "../../types/entity";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import SceneHierarchyTreeItem from "./SceneHierarchyTreeItem";
import { ISceneHierarchyTreeItem } from "../../types/scene-hierarchy";

interface SceneHierarchyTreeProperties {
    setLastSelectedItemID: (newID: string | null) => void;
};

const sceneHierarchyTreeStyle: React.CSSProperties = {
    width: '100%',
    height: '120px',
    overflowY: 'auto',
    backgroundColor: '#1E1E1E',
    padding: '16px',
    color: 'white',
}

const defaultExpandedItemIDs: Array<string> = [
    'blueforce-root',
    'redforce-root'
]

const SceneHierarchyTree: React.FC<SceneHierarchyTreeProperties> = (properties: SceneHierarchyTreeProperties) => {
    const mapElements = useMapElementsContext();

    const mapElementsFilterByAffiliation: (affiliation: Affiliation) => ISceneHierarchyTreeItem[] = (affiliation: Affiliation) => {
        return mapElements.renderables
            .filter((value: IMapRenderable): value is MilitaryEntity => { return (value as MilitaryEntity).getAffiliation && (value as MilitaryEntity).getAffiliation()  === affiliation })
            .map((value: IMapRenderable) => {
                const militaryEntity = value as MilitaryEntity;
                return {
                    getHierarchyTreeItemID: () => militaryEntity.getHierarchyTreeItemID(),
                    getHierarchyTreeLabel: () => militaryEntity.getHierarchyTreeLabel(),
                    getHierarchyTreeChildren: () => { return [] },
                    getHierarchyTreeIcon: () => militaryEntity.getHierarchyTreeIcon()
                } as ISceneHierarchyTreeItem;
            });
    };

    const hierarchyTreeFactory: (() => ISceneHierarchyTreeItem[]) = () => {
        return [
            {
                getHierarchyTreeItemID: () => 'blueforce-root',
                getHierarchyTreeLabel: () => 'Blueforce',
                getHierarchyTreeIcon: () => <ExpandMore />,
                getHierarchyTreeChildren: () => mapElementsFilterByAffiliation(Affiliation.Friend)
            },
            {
                getHierarchyTreeItemID: () => 'redforce-root',
                getHierarchyTreeLabel: () => 'Redforce',
                getHierarchyTreeIcon: () => <ExpandMore />,
                getHierarchyTreeChildren: () => mapElementsFilterByAffiliation(Affiliation.Hostile)
            }
        ];
    };

    const hierarchyTree: ISceneHierarchyTreeItem[] = useMemo(hierarchyTreeFactory, [mapElements.renderables]);

    const handleClick: (event: React.MouseEvent, itemID: string | null) => void = (_event: React.MouseEvent, itemID: string | null) => {
        if (!defaultExpandedItemIDs.includes(itemID ? itemID : "")) properties.setLastSelectedItemID(itemID);
    }

    return <Box style={sceneHierarchyTreeStyle}>
        <SimpleTreeView onItemClick={handleClick} defaultExpandedItems={defaultExpandedItemIDs}>
            { 
                hierarchyTree.map((value: ISceneHierarchyTreeItem, index: number) => (
                    <TreeItem itemId={value.getHierarchyTreeItemID()} label={value.getHierarchyTreeLabel()} key={index} slots={{icon: value.getHierarchyTreeIcon, expandIcon: () => <ExpandMore />, collapseIcon: () => <ExpandLess />}}>
                        { 
                            value.getHierarchyTreeChildren().map((child: ISceneHierarchyTreeItem, childIndex: number) => (
                                <SceneHierarchyTreeItem item={child} key={childIndex}/>
                            ))
                        }
                    </TreeItem>
                ))
            }
        </SimpleTreeView>
    </Box>
}

export default SceneHierarchyTree;