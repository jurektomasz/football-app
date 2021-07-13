import React, { useEffect, useCallback } from "react";

import { useMap } from "providers/MapProvider";

export default function TomMap({ location }) {
  const { initMap, requestGeoLocation, setCenter, addMarker } = useMap();
  let map;

  const getGeoLocation = useCallback(
    (location) => {
      location &&
        requestGeoLocation(location).then((position) => {
          setCenter(map, position);
          addMarker(map, position);
        });
    },
    [requestGeoLocation]
  );

  useEffect(() => {
    getGeoLocation(location);
  }, [location, getGeoLocation]);

  useEffect(() => {
    map = initMap();
  }, [initMap]);

  return <div className="map-container" id="map"></div>;
}
