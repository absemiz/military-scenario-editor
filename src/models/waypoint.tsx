import React from "react";
import { IMapRenderable } from "../types/map";

import { LocationOnOutlined } from "@mui/icons-material";

import WaypointView from "../components/waypoint-view/WaypointView";
import { IAssetTreeItem } from "../types/asset-browser";

class Waypoint implements IMapRenderable, IAssetTreeItem {
    private static instanceCounter: number = 0;

    public id: string;
    private position: [number, number] = [0, 0];
    private key: number;
    description?: string | undefined;
    
    label: string;
    treeChildren: IAssetTreeItem[];

    public constructor(position: [number, number] = [0, 0]) {
        this.id = `waypoint-${Waypoint.instanceCounter.toString()}`;
        this.position = position;
        this.label = `Waypoint-${Waypoint.instanceCounter}`;
        this.treeChildren = [];
        this.key = Waypoint.instanceCounter;

        Waypoint.instanceCounter++;
    }
        
    public treeIcon(): React.JSX.Element {
        return <LocationOnOutlined />
    }

    subTypeName?: (() => string) | undefined;

    public setPosition(newPosition: [number, number]): void {
        this.position = newPosition;
    }

    public mapID(_index: number | undefined): string {
        return this.id;
    }
    public mapPosition(): [number, number] { return this.position; }
    public mapComponent(): React.JSX.Element {
        return <WaypointView waypoint={this}/>;
    }

    public getKey(): number {
        return this.key;
    }
}

export default Waypoint;