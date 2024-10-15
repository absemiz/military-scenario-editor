import React from "react";

interface IMapRenderable 
{
    mapID: (index?: number) => string;
    mapPosition: () => [number, number];
    mapComponent: () => React.JSX.Element;
}

export type { IMapRenderable }