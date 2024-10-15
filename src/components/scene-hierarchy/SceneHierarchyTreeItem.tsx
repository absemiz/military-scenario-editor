import React from "react";

import { TreeItem } from "@mui/x-tree-view";

import { ISceneHierarchyTreeItem } from "../../types/scene-hierarchy";

interface SceneHierarchyTreeItemProperties {
    item: ISceneHierarchyTreeItem
    onClick?: React.MouseEventHandler<HTMLLIElement> | undefined
};

const SceneHierarchyTreeItem: React.FC<SceneHierarchyTreeItemProperties> = (properties: SceneHierarchyTreeItemProperties) => {
    return <TreeItem onClick={properties.onClick} itemId={`${properties.item.getHierarchyTreeItemID()}`} label={properties.item.getHierarchyTreeLabel()} slots={{icon: properties.item.getHierarchyTreeIcon}}> </TreeItem>
};

export default SceneHierarchyTreeItem;