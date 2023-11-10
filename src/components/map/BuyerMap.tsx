"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Container from "../ui/Container";
import { LatLngExpression } from "leaflet";

const BuyerMap = () => {
  const position: LatLngExpression = [23.720881, 90.483269];

  return (
    <Container>
      <MapContainer
        center={position}
        zoom={18}
        className="w-full min-h-[260px] rounded-lg border-none"
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=XVw7OtsXEgUkX0MGlGpYXcTPOCWtTR4GRZApVLdDzdzPGsfjzVmBfsgq8Pav75tF"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </Container>
  );
};

export default BuyerMap;
