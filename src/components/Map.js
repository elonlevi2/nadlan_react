import React, { useEffect, useState } from 'react'

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { addressToGeocode } from '../client/axiosGeocodeApi';
import { propertiesToMap } from '../client/axiosToApiProperies';

function Map() {

    const [properties, setProperties] = useState([])
    const [geocode, setGeocode] = useState([])
    const [change, setChange] = useState(false)



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

    useEffect(()=> {
      async function data() {
        const res = await propertiesToMap()
        setProperties(res)
        setChange(true)        
      }
      data()
    },[])

    useEffect(()=> {
      async function data() {
        for (const p of properties) {
          const loc = `${p.location}`;
          const res = await addressToGeocode(loc);
          setGeocode((prevList) => [{geocode:res, property:p}]);
          // console.log(res);
        }      
      }
      data()
    },[change])

    const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    // iconUrl: require("./icons/placeholder.png"),
    iconSize: [38, 38] // size of the icon
    });

  return (
    <div style={{height:"100vh"}}>
      <button onClick={()=>{console.log(properties, geocode)}}>gg</button>
    <MapContainer center={[31.774216454298205, 35.21035281594243]} zoom={10}>
        <TileLayer
        attribution='&copy; <a href="https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Israel.svg">OpenStreetMap</a> contributors'
        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {/* <MarkerClusterGroup> */}

          {/* {geocode.map((g)=> {
            const geo = [parseFloat(g.geocode.lat), parseFloat(g.geocode.lng)]
            console.log(geo);
            <Marker position={geo} icon={customIcon}>
              <Popup><div>{g.property.address}</div></Popup>
            </Marker>
          })} */}

          {geocode.map((g) => {
            return (<Marker key={g.property.id} position={g.geocode} icon={customIcon}>
              <Popup><div>{g.property.address}, {g.property.type}</div></Popup>
            </Marker>)
          })}
          
          {/* {markers.map((marker) => {
            return (<Marker position={marker.geocode} icon={customIcon}>
              <Popup>hg</Popup>
            </Marker>)
          })} */}

        {/* </MarkerClusterGroup> */}

    </MapContainer>
    </div>
  )
}

export default Map