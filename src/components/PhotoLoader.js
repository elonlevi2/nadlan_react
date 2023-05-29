import React, { useState } from 'react'

function PhotoLoader() {
    const [photo, setPhoto] = useState()

    const handleSend = () => {
        const fd = new FormData()

        // for (let i = 0; i < photo.length; i++) {
        //     fd.append(`photo[${i}]`, photo[i]);
        // }
        for (let i = 0; i < photo.length; i++) {
            fd.append(photo[i].name, photo[i])
          }
       
        const options = {
            headers: {'Accept': 'application/json'},
            method: 'POST',          
            body: fd,
        };
        console.log(fd.keys)
         
        fetch('http://127.0.0.1:8000/api/photo', options)
        .then((res) => {
             res.json().then((resJ) => {
                 console.log(resJ) })                
       }).catch((e)=>{window.alert(`photo save Error: ${e}`)})
    }


  return (<>
        <input type="file" accept='images/*' multiple
              onChange={(e) => { setPhoto(e.target.files); }} />              
        <br/>
        <button onClick={handleSend} disabled={!photo}> upload </button>
    </>)
}

export default PhotoLoader