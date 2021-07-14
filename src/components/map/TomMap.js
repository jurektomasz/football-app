import React, { useEffect, useCallback, useRef } from "react";

import { useMap } from "providers/MapProvider";

export default function TomMap({ location }) {
  const { initMap, requestGeoLocation, setCenter, addMarker, addPopupMessage } =
    useMap();
  let map = useRef();

  const getGeoLocation = useCallback(
    (location) => {
      location &&
        requestGeoLocation(location)
          .then((position) => {
            setCenter(map.current, position);
            addMarker(map.current, position);
          })
          .catch((error) => {
            addPopupMessage(map.current, error);
          });
    },
    [requestGeoLocation, addMarker, setCenter, map, addPopupMessage]
  );

  useEffect(() => {
    getGeoLocation(location);
  }, [location, getGeoLocation]);

  useEffect(() => {
    map.current = initMap();
  }, [initMap]);

  return <div className="map-container" id="map"></div>;
}
