import React from "react";

export enum MapRenderableKind
{
    MilitaryEntity,
    Waypoint,
    Path
}

export interface IMapRenderable 
{
    mapID: (index?: number) => string;
    mapPosition: () => [number, number];
    mapComponent: () => React.JSX.Element;
};