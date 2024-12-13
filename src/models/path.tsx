import React from "react";

import { CircleMarker, Polyline, Tooltip } from "react-leaflet";

import { IMapRenderable } from "../types/map";
import { ISceneHierarchyTreeItem } from "../types/scene-hierarchy";
import { Timeline } from "@mui/icons-material";
import SvgIcon from "@mui/material/SvgIcon";

class Path implements IMapRenderable, ISceneHierarchyTreeItem {
    private static instanceCounter: number = 0;

    private mID: string;
    private mPoints: Array<[number, number]> = [];

    public constructor () {
        this.mID = `path-${Path.instanceCounter.toString()}`;
        Path.instanceCounter++;
    }

    getHierarchyTreeItemID: () => string = () => { return this.mapID(); };
    getHierarchyTreeLabel: () => string = () => { return this.mapID().toUpperCase(); };
    getHierarchyTreeChildren: () => ISceneHierarchyTreeItem[] = () => { return []; };
    getHierarchyTreeIcon: () => React.JSX.Element = () => { return <SvgIcon component={Timeline} />; };

    public asJSON(): object
    {
        return {
            id: this.mID,
            points: this.mPoints
        };
    }

    public addPoint(point: [number, number]): void {
        this.mPoints.push(point);
    }

    public mapID(): string {
        return this.mID;
    }

    public mapPosition(): [number, number] {
        const length: number = this.mPoints.length;
        if (length === 0) return [0, 0];

        const sum: [number, number] = this.mPoints.reduce((currentSum, point) => { return [currentSum[0] + point[0], currentSum[1] + point[1]]; }, [0, 0])
        
        return [sum[0] / length, sum[1] / length];
    }

    public mapComponent(): React.JSX.Element {
        return <React.Fragment>
            { this.mPoints.map((point: [number, number], index: number) => { return <CircleMarker center={point} radius={8} key={index}><Tooltip direction="bottom" permanent={true}>{ `${this.getHierarchyTreeLabel()}|${index + 1}` }</Tooltip></CircleMarker>; }) }
            { this.mPoints.length >= 2 && <Polyline positions={[this.mPoints]} /> }
        </React.Fragment>
    }

}

export default Path;