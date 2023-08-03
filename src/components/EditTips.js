import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GetTipToEdit, axiosDeleteTip } from '../client/axiosToApiTips'
import { Button } from 'react-bootstrap'
import { editTipFetch } from '../client/axiosToAddAds'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifyError } from '../config';


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
        if (res) {
          toast.success('הטיפ נערך בהצלחה', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => {
              nav('/my-tips');
            }
            });
        } else {
          notifyError("בעיה בעריכת הטיפ");
        }
    }

    const deleteTip = async ()=>{
      const res = await axiosDeleteTip(id)
      if (res) {
        toast.success('הטיפ נמחק בהצלחה', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            nav('/my-tips');
          }
          });
      }
    }

  return (<>
    <div className='div-main-edit-tip'>

        <div className='div-form'>
            <form className='form' onSubmit={handelsubmittip}>
                <input type='text' placeholder='כותרת הטיפ' value={title} onChange={(e)=> {setTitle(e.target.value)}}/>
                <textarea placeholder='תוכן הטיפ' value={content} onChange={(e)=> {setContent(e.target.value)}}/>
                {error && <p style={{color:'red'}}>{error}</p>}

                <Button variant='success' type='submit'>ערוך</Button>
            </form>
            <Button className='delete-edit-tip' variant='danger' onClick={deleteTip}>מחיקת הטיפ</Button>
        </div>

    </div>
    <ToastContainer/>

  </>)
}

export default EditTips