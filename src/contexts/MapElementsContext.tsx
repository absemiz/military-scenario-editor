
import React, { createContext, useState } from "react";

import { IMapRenderable } from "../types/map";

export interface MapElementsContextType {
    renderables: IMapRenderable[];
    addRenderable: (renderable: IMapRenderable) => void;
    removeRenderable: (id: string) => void;
    updateRenderable: (id: string, updatedRenderable: IMapRenderable) => void;
    getRenderable: (id: string) => (IMapRenderable | undefined)
};

export const MapElementsContext: React.Context<MapElementsContextType | undefined> = createContext<MapElementsContextType | undefined>(undefined);
export const MapElementsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [renderables, setRenderables] = useState<IMapRenderable[]>([]);

    const addRenderable = (renderable: IMapRenderable) => { renderable.mapID(renderables.length); setRenderables((current) => [...current, renderable]); }
    const removeRenderable = (id: string) => { setRenderables((current) => current.filter((renderable) => renderable.mapID(undefined) !== id));}
    const updateRenderable = (id: string, updatedRenderable: IMapRenderable) => { setRenderables((currentRenderables) => { return currentRenderables.map((renderable) => { return renderable.mapID(undefined) === id ? updatedRenderable : renderable }) }) }
    const getRenderable = (id: string): IMapRenderable | undefined => { return renderables.find((value: IMapRenderable) => id === value.mapID()); };

    return (
        <MapElementsContext.Provider value={{renderables, addRenderable, removeRenderable, updateRenderable, getRenderable}}>
            {children}
        </MapElementsContext.Provider>
    );
}
