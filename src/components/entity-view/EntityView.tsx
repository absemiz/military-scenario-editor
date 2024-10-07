import React, { useRef, useMemo } from "react";

import { DragEndEvent, LeafletEventHandlerFnMap, Marker as LeafletMarker } from "leaflet";
import { Marker, Tooltip } from "react-leaflet";

import MilitaryEntity from "../../models/military-entity";
import MilitarySymbolFactory from "../../utilities/military-symbol-factory";

interface EntityViewProperties {
    entity: MilitaryEntity
};

const EntityView: React.FC<EntityViewProperties> = (properties: EntityViewProperties) => {

    const markerReference = useRef<LeafletMarker | null>(null);
    const eventHandlersFactory: () => LeafletEventHandlerFnMap = () => {
        return {
            dragend: function (_event: DragEndEvent) {
                if (markerReference !== null) {
                    const marker = markerReference.current;
                    if (!marker) throw new Error("Invalid Marker reference.");

                    const position = marker.getLatLng();

                    properties.entity.setPosition([position.lat, position.lng]);
                }
            }
            
        };
    };

    const eventHandlers = useMemo(eventHandlersFactory, []);

    return <Marker 
    eventHandlers={eventHandlers} 
    draggable={true} ref={markerReference} 
    position={properties.entity.mapPosition()} 
    icon={MilitarySymbolFactory.getInstance().createLeafletIcon(properties.entity.symbolicIdentificationCode)}>
        <Tooltip direction="bottom" permanent={true} offset={[0, 8]}>
            { properties.entity.getCallsign() }
        </Tooltip>
    </Marker>
}

export default EntityView;