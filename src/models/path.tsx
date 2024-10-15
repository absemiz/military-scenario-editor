import React from "react";

import { CircleMarker, Polyline, Tooltip } from "react-leaflet";

import { IMapRenderable } from "../types/map";

class Path implements IMapRenderable {
    private static instanceCounter: number = 0;

    private id: string;
    private points: Array<[number, number]> = [];

    public constructor () {
        this.id = `path-${Path.instanceCounter.toString()}`;
        Path.instanceCounter++;
    }

    public addPoint(point: [number, number]): void {
        this.points.push(point);
    }

    public mapID(_index?: number): string {
        return this.id;
    }

    public mapPosition(): [number, number] {
        const length: number = this.points.length;
        if (length === 0) return [0, 0];

        const sum: [number, number] = this.points.reduce((currentSum, point) => { return [currentSum[0] + point[0], currentSum[1] + point[1]]; }, [0, 0])
        

        return [sum[0] / length, sum[1] / length];
    }
    public mapComponent(): React.JSX.Element {
        return <React.Fragment>
            { this.points.map((point: [number, number], index: number) => { return <CircleMarker center={point} radius={8} key={index}><Tooltip direction="bottom" permanent={true}>{ index + 1 }</Tooltip></CircleMarker>; }) }
            { this.points.length >= 2 && <Polyline positions={[this.points]} /> }
        </React.Fragment>
    }

}

export default Path;