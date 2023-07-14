import React, { useState } from 'react'
import CardBroker from './CardBroker'
import { brokersFetch } from '../client/axiosToBrokers'
import InfiniteScroll from 'react-infinite-scroller'

function Brokers() {
    const [brokers, setBrokers] = useState([])
    const [pagenum, setPagenum] = useState(0)
    const [hasmore, setHasmore] = useState(true)

    const addBroker = async ()=> {
        const res = await brokersFetch(pagenum, 10)
    
        if (!res.has_more) {
          setHasmore(false)
        }
        setPagenum((prev) => {
            return prev + 1;
        });
    
        const newBrokers = [...brokers, ...res.data]
    
        setBrokers(newBrokers)
      }


  return (<>
    <div className='main-div'>
        <InfiniteScroll
        loadMore={addBroker}
        hasMore={hasmore}
        loader={<div key={0}>loading...</div>}
        className='ifinscroll'
        >
        {brokers && brokers.map((b)=>{return <CardBroker key={b.id} broker={b}/>})}

        </InfiniteScroll>
    </div>
  </>)
}

export default Brokers