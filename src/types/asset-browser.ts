import React from "react";

export interface IAssetTreeItem {
    id: string;
    label: string;
    treeChildren: IAssetTreeItem[];
    treeIcon: () => React.JSX.Element;
    description?: string;
    subTypeName? : () => string;
}