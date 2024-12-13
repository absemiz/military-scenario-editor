import React, { useMemo, useRef } from "react";

import { Icon, LeafletEventHandlerFnMap, Marker as LeafletMarker, } from "leaflet";
import { Marker, Tooltip } from "react-leaflet";

import Waypoint from "../../models/waypoint";
import { MaterialIconsEmbeddedURL } from "../../data/material-icon";
import { useMapElementsContext } from "../../hooks/useMapElementsContext";

interface WaypointViewProperties {
    waypoint: Waypoint;
}

const WaypointView: React.FC<WaypointViewProperties> = (properties: WaypointViewProperties) => {
    const markerReference = useRef<LeafletMarker | null>(null);

    const mapRenderables = useMapElementsContext();

    const eventHandlersFactory: () => LeafletEventHandlerFnMap = () => {
        return {
            dragend: function () {
                if (markerReference !== null) {
                    const marker = markerReference.current;
                    if (!marker) throw new Error("Invalid Marker reference.");

                    const position = marker.getLatLng();

                    properties.waypoint.setPosition([position.lat, position.lng]);

                    mapRenderables.updateRenderable(properties.waypoint.mapID(), properties.waypoint);
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
        <Tooltip permanent={true} direction="bottom">{`WP${properties.waypoint.getKey() + 1}(${properties.waypoint.mapPosition()[0].toFixed(5)}, ${properties.waypoint.mapPosition()[1].toFixed(5)})` }</Tooltip>
    </Marker>;
}

export default WaypointView;