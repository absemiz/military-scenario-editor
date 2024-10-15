
export interface ISceneHierarchyTreeItem
{
    getHierarchyTreeItemID: () => string;
    getHierarchyTreeLabel: () => string;
    getHierarchyTreeChildren: () => ISceneHierarchyTreeItem[];
    getHierarchyTreeIcon: () => React.JSX.Element
};