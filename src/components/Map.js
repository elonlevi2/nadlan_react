import React, { useState } from 'react'

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

function Map() {

    const [properties, setProperties] = useState({geocode:"", popUp:""})



    const markers = [
        {
          geocode: [31.768056693526876, 35.21272329493379],
          popUp: <div style={{color:"red"}}>hey</div>
        },
        {
          geocode: [31.768056693526876, 35.21272329493379],
          popUp: "Hello, I am pop up 2"
        },
        {
          geocode: [31.768056696526876, 35.21282329493379],
          popUp: "Hello, I am pop up 3"
        }
      ];
    
    const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    // iconUrl: require("./icons/placeholder.png"),
    iconSize: [38, 38] // size of the icon
    });

  return (
    <div style={{height:"100vh"}}>
    <MapContainer center={[31.774216454298205, 35.21035281594243]} zoom={13}>
        <TileLayer
        attribution='&copy; <a href="https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Israel.svg">OpenStreetMap</a> contributors'
        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <MarkerClusterGroup>
            {markers.map((marker) => (
                <Marker position={marker.geocode} icon={customIcon}>
                    <Popup>{marker.popUp}</Popup>
                </Marker>
                ))}
        </MarkerClusterGroup>
    </MapContainer>
    </div>
  )
}

export default Map