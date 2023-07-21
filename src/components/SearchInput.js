import { Dropdown } from 'bootstrap';
import React, { useEffect, useState } from 'react'
import { city } from '../client/axiosGeocodeApi';

const options = [
    'jerusalem',
    'tlv',
    'heifa',
    'modiin',
  ];

function SearchInput() {

    const [value, setValue] = useState('')
    const [allCity, setAllCity] = useState([]) 

    useEffect(()=> {
        async function data() {
            const res = await city()
            setAllCity([...res.result.records])
        }
        data()
    },[])
    
  return (<>
  
    <input type='text' value={value} onChange={(e) => setValue(e.target.value)}/>

    <div className='dropdown'>
        {allCity.filter(line => {
            const searchTerm = value
            const city = line.שם_ישוב

            return searchTerm && city.startsWith(searchTerm) && city !== searchTerm
        })
        .slice(0, 10)
        .map((line)=> {return <div>
            <div key={line._id} onClick={()=>{setValue(line.שם_ישוב)}} className='dropdown-row'>{line.שם_ישוב}</div>
        </div> })}
    </div>
    
  </>)
}

export default SearchInput