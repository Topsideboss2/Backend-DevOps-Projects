import React, { useState, useEffect } from "react";
import GoogleMapReact from "@googlemaps/react-wrapper";

const Map = ({ latitude, longitude }) => {
  const [center, setCenter] = useState({ lat: latitude, lng: longitude });

  useEffect(() => {
    setCenter({ lat: latitude, lng: longitude });
  }, [latitude, longitude]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyB8BLx702qD8lJeElbi6pmL1YpeXNiNuVI" }}
        center={center}
        zoom={15}
      />
    </div>
  );
};

export default Map;
