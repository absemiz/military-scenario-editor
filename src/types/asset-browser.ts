import React from "react";

export interface IAssetTreeItem 
{
    getAssetTreeItemID: () => string;
    getAssetTreeLabel: () => string;
    getAssetTreeChildren: () => IAssetTreeItem[];
    getAssetTreeIcon: () => React.JSX.Element;
    getDescription?: () => string;
    getSubTypeName?: () => string;
}