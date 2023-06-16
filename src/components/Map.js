import React, { useEffect, useState } from 'react'

import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { addressToGeocode } from '../client/axiosGeocodeApi';
import { propertiesToMap } from '../client/axiosToApiProperies';
import { Button } from 'react-bootstrap';

function Map() {

    const [properties, setProperties] = useState([])
    const [geocode, setGeocode] = useState([])
    const [change, setChange] = useState(false)
    const [search, setSearch] = useState()
    const [zoomMap, setZoomMap] = useState([31.78003, 35.21873])


    const handelsubmit = async(e)=> {
      e.preventDefault()
      const loc = `${search}`;
      const zoom = await addressToGeocode(loc);
      console.log(zoom)
      // setZoomMap([zoom.lat, zoom.lng])
      setZoomMap(zoom)
    }

    // useEffect(()=>{
    //   async function geozoom() {
    //     const loc = `${search}`;
    //     const zoom = await addressToGeocode(search);
    //     console.log(zoom)
    //   }
    //   geozoom()
    // },[search])

    useEffect(()=>{console.log(zoomMap)},[zoomMap])


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
          const loc = `${p.location}, ${p.address}`;
          const res = await addressToGeocode(loc);
          setGeocode((prevList) => [...prevList,{geocode:res, property:p}]);
          // console.log(res);
        }      
      }
      data()
    },[change])

    const customIcon = new Icon({
    // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconUrl: require("./iconLeaflet2.png"),
    iconSize: [38, 38] // size of the icon
    });

    const customIconSearch = new Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
      iconSize: [38, 38] // size of the icon
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
      {/* <button onClick={()=>{console.log(properties, geocode)}}>gg</button> */}
    <MapContainer center={zoomMap} zoom={13}>
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
      <Popup>hhhh</Popup>
    </Marker>
  )
}

export default Map