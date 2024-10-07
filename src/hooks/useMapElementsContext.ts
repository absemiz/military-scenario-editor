import { useContext } from "react";
import { MapElementsContext, MapElementsContextType } from "../contexts/MapElementsContext";

export const useMapElementsContext = (): MapElementsContextType => {
    const context: MapElementsContextType | undefined = useContext(MapElementsContext);

    if (!context) throw new Error("useMapElementsContext must be used within a MapElementsProvider");

    return context;
};
