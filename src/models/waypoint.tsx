import React from "react";
import { IMapRenderable } from "../types/map";

import { LocationOnOutlined, Place } from "@mui/icons-material";

import WaypointView from "../components/waypoint-view/WaypointView";
import { IAssetTreeItem } from "../types/asset-browser";
import { ISceneHierarchyTreeItem } from "../types/scene-hierarchy";
import { SvgIcon } from "@mui/material";

class Waypoint implements IMapRenderable, IAssetTreeItem, ISceneHierarchyTreeItem {
    private static instanceCounter: number = 0;

    private mID: string;
    private mLabel: string;
    private mPosition: [number, number] = [0, 0];
    private mKey: number;
    

    public constructor(position: [number, number] = [0, 0]) {
        this.mID = `waypoint-${Waypoint.instanceCounter.toString()}`;
        this.mPosition = position;
        this.mLabel = `Waypoint-${Waypoint.instanceCounter}`;
        this.mKey = Waypoint.instanceCounter;

        Waypoint.instanceCounter++;
    }

    getHierarchyTreeItemID: () => string = () => { return this.mapID(); };
    getHierarchyTreeLabel: () => string = () => { return this.mapID().toUpperCase(); };
    getHierarchyTreeChildren: () => ISceneHierarchyTreeItem[] = () => { return []; };
    getHierarchyTreeIcon: () => React.JSX.Element = () => { return <SvgIcon component={Place} />; };

    public asJSON(): object
    {
        return {
            id: this.mID,
            position: [...this.mPosition, 0]
        };
    }

    public getAssetTreeItemID(): string
    {
        return this.mID;
    }

    public getAssetTreeLabel(): string
    {
        return this.mLabel;
    }

    public getAssetTreeChildren(): IAssetTreeItem[]
    {
        return [];
    }
   
    public getDescription?: (() => string) | undefined = undefined;

    public getSubTypeName?: (() => string) | undefined = undefined;
        
    public getAssetTreeIcon(): React.JSX.Element 
    {
        return <LocationOnOutlined />
    }

    public setPosition(newPosition: [number, number]): void 
    {
        this.mPosition = newPosition;
    }

    public mapID(): string 
    {
        return this.mID;
    }

    public mapPosition(): [number, number] 
    { 
        return this.mPosition; 
    }

    public mapComponent(): React.JSX.Element 
    {
        return <WaypointView waypoint={this}/>;
    }

    public getKey(): number 
    {
        return this.mKey;
    }
}

export default Waypoint;