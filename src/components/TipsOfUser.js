import React, { useState } from 'react'
import { tipsOfUserAxios } from '../client/axiosToApiTips'
import CardTips from './CardTips'
import InfiniteScroll from 'react-infinite-scroller'

function TipsOfUser() {
    const [tips, setTips] = useState([])
    const [pagenum, setPagenum] = useState(0)
    const [hasmore, setHasmore] = useState(true)
  
    const addTips = async ()=> {
        const res = await tipsOfUserAxios(pagenum, 10)
        
        if (!res.has_more) {
            setHasmore(false)
        }
        setPagenum((prev) => {
            return prev + 1;
        });

        const newTips = [...tips, ...res.data]
    
        setTips(newTips)
    }
  return (<>

    <div className='div-about-the-page'>

        <div className='div-title-about-the-page'>
        <h2 >הטיפים שלי</h2>
        </div>

    </div>

    <div className='div-of-all-cards'>
        <InfiniteScroll
        loadMore={addTips}
        hasMore={hasmore}
        loader={<div key={0}>loading...</div>}
        >
        {tips && tips.map((t)=>{return <CardTips key={t.id} tip={t}/>})}

        </InfiniteScroll>

    </div>
  </>)
}

export default TipsOfUser