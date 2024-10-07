import React from "react";

import { TreeItem } from "@mui/x-tree-view";

import { IAssetTreeItem } from "../../types/asset-browser";
import MilitaryEntity from "../../models/military-entity";

interface SceneHierarchyTreeItemProperties {
    item: IAssetTreeItem
};

const SceneHierarchyTreeItem: React.FC<SceneHierarchyTreeItemProperties> = (properties: SceneHierarchyTreeItemProperties) => {
    console.log(`${properties.item.id}-${properties.item instanceof MilitaryEntity}`)

    return <TreeItem itemId={`${properties.item.id}`} label={properties.item instanceof MilitaryEntity ? (properties.item.getCallsign()) : properties.item.label} slots={{icon: properties.item.treeIcon}}> </TreeItem>
};

export default SceneHierarchyTreeItem;