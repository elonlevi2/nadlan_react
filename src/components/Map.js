import React, { useEffect, useState } from 'react'

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { addressToGeocode } from '../client/axiosGeocodeApi';
import { propertiesToMap } from '../client/axiosToApiProperies';

function Map() {

    const [properties, setProperties] = useState([])
    const [geocode, setGeocode] = useState({})




    // const markers = [
    //     {
    //       geocode: [31.768056693526876, 35.21272329493379],
    //       popUp: <div style={{color:"red"}}>hey</div>
    //     },
    //     {
    //       geocode: [31.768056693526876, 35.21272329493379],
    //       popUp: "Hello, I am pop up 2"
    //     },
    //     {
    //       geocode: [31.768056696526876, 35.21282329493379],
    //       popUp: "Hello, I am pop up 3"
    //     }
    //   ];

    useEffect(()=> {
      async function data() {
        const res = await propertiesToMap()
        console.log(res)
        setProperties(res)        
      }
      data()
    },[])

    

    // const res = async ()=>{
    //    const r = await addressToGeocode(loc);
    //    console.log(r.lat)
    //    setProperties({lat: r.lat, lng: r.lng})
    //   }
  

    const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    // iconUrl: require("./icons/placeholder.png"),
    iconSize: [38, 38] // size of the icon
    });

  return (
    <div style={{height:"100vh"}}>
      <button onClick={()=>{console.log(properties)}}>gg</button>
    <MapContainer center={[31.774216454298205, 35.21035281594243]} zoom={13}>
        <TileLayer
        attribution='&copy; <a href="https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Israel.svg">OpenStreetMap</a> contributors'
        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <MarkerClusterGroup>
            {/* {properties && properties.map(async(p) => {
              const loc = `${p.location}`;
              const res = await addressToGeocode(loc);
              setGeocode(res);
              console.log(res);
                <Marker position={[31.55555, 32.555555]} icon={customIcon}>
                    <Popup>h</Popup>
                </Marker>
              })} */}

              {/* <Marker position={[properties.lat, properties.lng]} icon={customIcon}>
                  <Popup>jj</Popup>
              </Marker> */}

        </MarkerClusterGroup>
    </MapContainer>
    </div>
  )
}

export default Map