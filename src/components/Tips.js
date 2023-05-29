import React, { useEffect, useState } from 'react'
import '../client/axiosToApiTips'
import { tipsFetch } from '../client/axiosToApiTips'
import CardTips from './CardTips'
import InfiniteScroll from 'react-infinite-scroller'

function Tips() {
  const [tips, setTips] = useState([])
  const [pagenum, setPagenum] = useState(0)
  const [hasmore, setHasmore] = useState(true)


  const addTips = async ()=> {
    const res = await tipsFetch(pagenum, 10)

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
        <h2 >דירה ראשונה ?</h2>
      </div>

      <div className='div-context-about-the-page'>
        <p>הנה כמה טיפים שיוכלו לעזור לך למצוא את הנכס המתאים עבורך ! </p>
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

export default Tips