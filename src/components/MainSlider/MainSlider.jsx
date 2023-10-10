import React from 'react'
import Slider from "react-slick";
import img1 from '../../Assets/img/slider-image-1.jpeg'
import img2 from '../../Assets/img/slider-image-2.jpeg'
import img3 from '../../Assets/img/slider-image-3.jpeg'
import img4 from '../../Assets/img/grocery-banner.png'
import img5 from '../../Assets/img/grocery-banner-2.jpeg'

export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay:true,
        slidesToShow: 1,
        slidesToScroll: 1
      };
  return (
    <div>
        
            <div className="row my-5 gx-0">
            <div className="col-md-9">

            <Slider {...settings}>
                    <img src={img1} height={400} className='w-100' alt="" />
                    <img src={img2} height={400} className='w-100' alt="" />
                    <img src={img3} height={400} className='w-100' alt="" />
        </Slider>

                </div>
                <div className="col-md-3">
                <img src={img4} height={200} className='w-100' alt="" />
                <img src={img5} height={200} className='w-100' alt="" />
                </div>

            </div>



    </div>
  )
}
