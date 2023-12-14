// EtablissementMap.js
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

import 'leaflet/dist/leaflet.css';
import "./dataMap.css"


function DatatMap({ latitude, longitude, name, address}) {
  const position = [latitude, longitude];
  

  if (latitude === null || longitude === null) {
    return <div>Informations manquantes</div>;
  }

  return (
    <div className='map-container'>
      <div id="map">
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
            <div className='popup'>
              <Popup position={position}>
                <div className="position">
                    <span>
                    {name}
                    </span>
                    <span>
                    {address}
                    </span>
                </div>
              </Popup>
            </div>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default DatatMap;