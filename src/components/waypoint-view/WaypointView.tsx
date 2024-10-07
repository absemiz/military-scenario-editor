import React, { useMemo, useRef } from "react";

import { Icon, LeafletEventHandlerFnMap, Marker as LeafletMarker, DragEndEvent } from "leaflet";
import { Marker, Tooltip } from "react-leaflet";

import Waypoint from "../../models/waypoint";
import { MaterialIconsEmbeddedURL } from "../../data/material-icon";

interface WaypointViewProperties {
    waypoint: Waypoint;
}

const WaypointView: React.FC<WaypointViewProperties> = (properties: WaypointViewProperties) => {
    const markerReference = useRef<LeafletMarker | null>(null);

    const eventHandlersFactory: () => LeafletEventHandlerFnMap = () => {
        return {
            dragend: function (_event: DragEndEvent) {
                if (markerReference !== null) {
                    const marker = markerReference.current;
                    if (!marker) throw new Error("Invalid Marker reference.");

                    const position = marker.getLatLng();

                    properties.waypoint.setPosition([position.lat, position.lng]);
                }
            }
            
        };
    };

    const eventHandlers = useMemo(eventHandlersFactory, []);

    return <Marker
    draggable={true}
    ref={markerReference} 
    icon={new Icon({ iconUrl: MaterialIconsEmbeddedURL['locationOn32'], iconSize: [32, 32] })} 
    position={properties.waypoint.mapPosition()}
    eventHandlers={eventHandlers}>
        <Tooltip permanent={true} direction="bottom">{ `Waypoint-${properties.waypoint.getKey() + 1}` }</Tooltip>
    </Marker>;
}

export default WaypointView;