import React, { useRef, useMemo } from "react";

import { DragEndEvent, LeafletEventHandlerFnMap, Marker as LeafletMarker, LeafletMouseEvent, Direction, PointExpression } from "leaflet";
import { Marker, Tooltip } from "react-leaflet";

import MilitaryEntity from "../../models/military-entity";
import MilitarySymbolFactory from "../../utilities/military-symbol-factory";
import { useMapElementsContext } from "../../hooks/useMapElementsContext";
import { useApplicationStateContext } from "../../hooks/useApplicationStateContext";

interface EntityViewProperties {
    entity: MilitaryEntity
};

const EntityView: React.FC<EntityViewProperties> = (properties: EntityViewProperties) => {
    const applicationState = useApplicationStateContext();
    const mapElements = useMapElementsContext();
    
    const markerReference = useRef<LeafletMarker | null>(null);
    const eventHandlersFactory: () => LeafletEventHandlerFnMap = () => {
        return {
            click: function (event: LeafletMouseEvent) {
                applicationState.setEntityIDToDisplayAttributes(properties.entity.mapID());
                event.originalEvent.stopPropagation();
            },
            dragend: function (_event: DragEndEvent) {
                if (markerReference !== null) {
                    const marker = markerReference.current;
                    if (!marker) throw new Error("Invalid Marker reference.");

                    const position = marker.getLatLng();

                    properties.entity.setLatitude(position.lat);
                    properties.entity.setLongitude(position.lng);

                    mapElements.updateRenderable(properties.entity.mapID(), properties.entity);
                }
            }
        };
    };

    const eventHandlers = useMemo(eventHandlersFactory, []);

    let tooltipOffset: PointExpression;
    let tooltipDirection: Direction;
    if (properties.entity.getTypeName !== undefined)
    {
        const typeName: string = properties.entity.getTypeName();
        const groundEntity: boolean = (typeName === "Infantry" || typeName === "ArmoredVehicle");

        tooltipDirection = groundEntity ? "top" : "bottom";
        tooltipOffset = groundEntity ? [0, -16] : [0, 8];
    }
    else
    {
        tooltipDirection = "bottom";
        tooltipOffset = [0, 0];
    }
    
    return <Marker
    eventHandlers={eventHandlers} 
    draggable={applicationState.movingEnabled} 
    ref={markerReference} 
    position={properties.entity.mapPosition()} 
    icon={MilitarySymbolFactory.getInstance().createLeafletIconWithHeading(properties.entity.getSymbolicIdentificationCode(), 64, properties.entity.getHeading())}>
        <Tooltip direction={tooltipDirection} permanent={true} offset={tooltipOffset}>
            { properties.entity.getEntityCallsign() }
        </Tooltip>
    </Marker>
}

export default EntityView;