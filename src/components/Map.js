import React, { useEffect, useState } from 'react'

import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { addressToGeocode } from '../client/axiosGeocodeApi';
import { propertiesToMap } from '../client/axiosToApiProperies';
import { Button } from 'react-bootstrap';
// import useGeoLocation from './useGeoLocation';

function Map() {

    const [properties, setProperties] = useState([])
    const [geocode, setGeocode] = useState([])
    const [change, setChange] = useState(false)
    const [search, setSearch] = useState('')
    const [zoomMap, setZoomMap] = useState([31.837682632703338, 35.06535410361823])
    // const location = useGeoLocation()


    const handelsubmit = async(e)=> {
      e.preventDefault()
      const loc = `${search}`;
      const zoom = await addressToGeocode(loc);
      console.log(zoom)
      setZoomMap(zoom)
    }

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
          const loc = `${p.location}`;//+${p.address}
          const res = await addressToGeocode(loc);
          setGeocode((prevList) => [...prevList,{geocode:res, property:p}]);
        }      
      }
      data()
    },[change])

    const customIcon = new Icon({
    iconUrl: require("./iconLeaflet2.png"),
    iconSize: [38, 38]
    });

    const customIconSearch = new Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
      iconSize: [38, 38]
      });

  return (<>

    <div className='div-map'>
      <h2>מפת הנכסים</h2>
      <br/>
      <form style={{gap:'1rem'}} onSubmit={handelsubmit}>
        <Button type='submit'>search</Button>
        <input onChange={(e)=> {setSearch(e.target.value)}} style={{direction:"rtl"}} type='search' placeholder='חיפוש...'/>
      </form>
      {search}
    </div>
    <br/>

    <MapContainer center={zoomMap} zoom={10}>
        <TileLayer
        attribution='&copy; <a href="https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Israel.svg">OpenStreetMap</a> contributors'
        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {/* <MarkerClusterGroup> */}

          {geocode.map(g => <Marker position={[g.geocode.lat, g.geocode.lng]} icon={customIcon}>
              <Popup><div>{g.property.address}, {g.property.type}</div></Popup>
            </Marker>
          )}

          <Searchmarker zoomMap={zoomMap} customIconSearch={customIconSearch}/>

        {/* </MarkerClusterGroup> */}

    </MapContainer>

  </>)
}

const Searchmarker = (props)=> {
  const map = useMap()
  map.flyTo(props.zoomMap)
  return (
    <Marker position={props.zoomMap} icon={props.customIconSearch}>
      <Popup>הכתובת המבוקשת</Popup>
    </Marker>
  )
}

export default Map