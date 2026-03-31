import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import slide1 from '../images/header1.png';
import slide2 from '../images/header2.png';
import slide3 from '../images/header3.png';
import slide4 from '../images/header4.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

export default function SwiperComp() {
  const lista1 =[
    {
      titulo: 'Research',
      img: slide1,
    },
    {
      titulo: 'Academic',
      img: slide2,
    },
    {
      titulo: 'Community',
      img: slide3,
    },
    {
      titulo: 'Wellness',
      img: slide4,
    },
  ]

  return (
    <>
      <Swiper
        pagination={{
          type: 'progressbar',
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay,Pagination, Navigation]}
        className="mySwiper"
      >
        {lista1.map((item, index) => (
            <SwiperSlide  style={{backgroundColor:'white !important',textAlign:'center'}}>
            {/* <div class="card" style={{margin:'auto',width: '18rem'}}> */}
            <img src={item.img} alt="Innovation Hub" class="img-fluid" loading="lazy"/>
            </SwiperSlide>
         ))}
        {/* <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
      </Swiper>
    </>
  );
}
