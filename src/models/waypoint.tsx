import React from "react";
import { IMapRenderable } from "../types/map";

import { LocationOnOutlined } from "@mui/icons-material";

import WaypointView from "../components/waypoint-view/WaypointView";
import { IAssetTreeItem } from "../types/asset-browser";

class Waypoint implements IMapRenderable, IAssetTreeItem {
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

    public mapID(_index: number | undefined): string 
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