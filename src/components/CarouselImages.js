import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Carousel } from 'react-bootstrap';
import { PhotoFetch } from '../client/axiosToApiProperies';


function CarouselImages({property_id}) {
    const [images, setImages] = useState([])


    useEffect(()=>{
        async function fetchData() {
          const res = await PhotoFetch(property_id)
          setImages(res.data)}
        fetchData()
      },[])

  return (<>        
    {images ? <Carousel fade>

        <Carousel.Item>
            <img
            className="d-block w-100"
            // src={images && `http://127.0.0.1:8000${images[0].image}`}
            alt="First slide"
            //   style={{width:'300px', height:'300px'}}
            />
        </Carousel.Item>

        <Carousel.Item>
            <img
            className="d-block w-100"
            //   src={images && `http://127.0.0.1:8000${images[1].image}`}
            alt="Second slide"
            //   style={{width:'300px', height:'300px'}}
            />
        </Carousel.Item>

        <Carousel.Item>
            <img
            className="d-block w-100"
            src="holder.js/800x400?text=Third slide&bg=20232a"
            alt="אין תמונות של הנכס"
            style={{width:'300px', height:'300px'}}
            />
        </Carousel.Item>

        <Carousel.Item>
            <img
            className="d-block w-100"
            src="holder.js/800x400?text=Third slide&bg=20232a"
            alt="אין תמונות של הנכס"
            style={{width:'300px', height:'300px'}}
            />
        </Carousel.Item>

    </Carousel> 
    :
    <div>thihihi</div>
}
    </>)
}

export default CarouselImages