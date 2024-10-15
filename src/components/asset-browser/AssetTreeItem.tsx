import React from "react";

import { useMap } from "react-leaflet";
import { LatLng } from "leaflet";

import { TreeItem } from "@mui/x-tree-view";

import { IAssetTreeItem } from "../../types/asset-browser";

import { useMapElementsContext } from "../../hooks/useMapElementsContext";
import { useApplicationStateContext } from "../../hooks/useApplicationStateContext";

import MilitaryEntitiesDataService from "../../data/entities-data";
import MilitaryEntity from "../../models/military-entity";

interface AssetTreeItemProperties {
    item: IAssetTreeItem;
}

const AssetTreeItem: React.FC<AssetTreeItemProperties> = (properties: AssetTreeItemProperties) => {
    const map = useMap();

    const mapElements = useMapElementsContext();
    const applicationState = useApplicationStateContext();

    const handleAssetItemDragStart = (event: React.DragEvent<HTMLLIElement>) => {
        map.dragging.disable();
        event.stopPropagation();
    }
    
    const handleAssetItemDragEnd = (event: React.DragEvent<HTMLLIElement>) => {
        const position: LatLng = map.containerPointToLatLng([event.clientX, event.clientY]);
        const entity: MilitaryEntity = MilitaryEntitiesDataService.getInstance().getEntityCopy(properties.item.getAssetTreeItemID());
        entity.setLatitude(position.lat);
        entity.setLongitude(position.lng);

        mapElements.addRenderable(entity);

        applicationState.setDisplayRepositioningInfo(true);
        setTimeout(() => { applicationState.setDisplayRepositioningInfo(false); }, 5000);

        applicationState.setEntityIDToDisplayAttributes(entity.mapID());

        event.stopPropagation();
        map.dragging.enable();
        
    }
    return <TreeItem draggable={true} onDragStart={handleAssetItemDragStart} onDragEnd={handleAssetItemDragEnd} itemId={properties.item.getAssetTreeItemID()} label={properties.item.getAssetTreeLabel()} slots={{ icon: properties.item.getAssetTreeIcon }}></TreeItem>;
}

export default AssetTreeItem;