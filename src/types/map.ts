import React from "react";

interface IMapRenderable {
    mapID: (index: number | undefined) => string;
    mapPosition: () => [number, number];
    mapComponent: () => React.JSX.Element;

    setMapPosition?: (position: [number, number]) => void;
}

export type { IMapRenderable }