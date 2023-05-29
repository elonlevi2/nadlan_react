import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { GetTipToEdit } from '../client/axiosToApiTips'
import { Button } from 'react-bootstrap'
import { addTipFetch, editTipFetch } from '../client/axiosToAddAds'

function EditTips() {
    const locationPath = useLocation()
    const search = new URLSearchParams(locationPath.search)
    const id = search.get("id")

    useEffect(()=>{
        fetch = async ()=>{
          const res = await GetTipToEdit(id);
          setTitle(res.title)
          setContent(res.content)

        }
      fetch()
      },[])

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState(false)


    const handelsubmittip = async (e)=> {
        e.preventDefault()
        if (!title | !content ) {
            setError('חובה למלא את הכל')
            return;
        } else {
            setError(false)
        }
        const res = await editTipFetch(title, content, id);
        window.alert('הטיפ נערך בהצלחה')            

    }

  return (<>
    <div className='div-main-add-tip'>

        <div className='div-form'>
            <form className='form' onSubmit={handelsubmittip}>
                <input type='text' placeholder='כותרת הטיפ' value={title} onChange={(e)=> {setTitle(e.target.value)}}/>
                <textarea placeholder='תוכן הטיפ' value={content} onChange={(e)=> {setContent(e.target.value)}}/>
                {error && <p style={{color:'red'}}>{error}</p>}

                <Button variant='success' type='submit'>ערוך</Button>
            </form>
        </div>
    </div>
  </>)
}

export default EditTips