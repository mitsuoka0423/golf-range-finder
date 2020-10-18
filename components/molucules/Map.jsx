import React, {useState, useCallback} from 'react';
import {GoogleMap, LoadScript} from '@react-google-maps/api';

const GOOGLE_MAP_API_KEY = 'AIzaSyAkpk3wPF3KeqMRKAdN9GCXPBHMOtBU11E';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const defaultCenter = {
  lat: 35.6761919,
  lng: 139.65031059999998,
};

/**
 * @return {*}
 */
export default function Map() {
  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAP_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        defaultZoom={1}
        defaultCenter={defaultCenter}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
      </GoogleMap>
    </LoadScript>
  );
}
