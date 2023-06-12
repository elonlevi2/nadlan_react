import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GetTipToEdit, axiosDeleteTip } from '../client/axiosToApiTips'
import { Button } from 'react-bootstrap'
import { addTipFetch, editTipFetch } from '../client/axiosToAddAds'

function EditTips() {
    const locationPath = useLocation()
    const search = new URLSearchParams(locationPath.search)
    const id = search.get("id")
    const nav = useNavigate()

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
        nav('/my-tips')
        window.alert('הטיפ נערך בהצלחה')            

    }

    const deleteTip = async ()=>{
      const res = await axiosDeleteTip(id)
      nav('/my-tips')
      window.alert(res)
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
            <Button variant='warning' onClick={deleteTip}>delete tip</Button>
        </div>
    </div>
  </>)
}

export default EditTips