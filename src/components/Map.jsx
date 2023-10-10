import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "./icon";

const Map = ({ position }) => {
  function LocationMarker() {
    const map = useMap();

    useEffect(() => {
      if (position) {
        map.flyTo(position, 13, {
          animate: true,
        });
      }
    }, [map, position]);

    return position ? (
      <Marker icon={icon} position={position}>
        <Popup>You are here</Popup>
      </Marker>
    ) : null;
  }

  return (
    <MapContainer
      center={position || [51.505, -0.09]} 
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default Map;
