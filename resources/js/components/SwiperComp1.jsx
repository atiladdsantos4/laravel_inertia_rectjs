import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import slide1 from '../images/header1.png';
import slide2 from '../images/header2.png';
import slide3 from '../images/header3.png';
import slide4 from '../images/header4.png';
// Import Swiper styles C:\Apache24\htdocs\projetos\inertia-react\resources\js\components\SwiperComp.jsx
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/pagination';
//import './swp.css';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

export default function SwiperComp(props) {
  const endpoint_img = null
  //import.meta.env.VITE_APP_IMG
  const lista1xx = props.dados
  const imagem = props.img

  console.log('props-swipper')
  console.log(props.dados)
  console.log('path imgens'+imagem)

  const lista1 =[
    {
      titulo: 'Research',
      img: slide1,
      alt: 'Innovation Hub',
      h4:'Innovation Hub',
      paragrafo:'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      icon1:'bi bi-cpu',
      span1:'AI Labs',
      icon2:'bi bi-gear',
      span2:'Market Place',
    },
    {
      titulo: 'Academic',
      img: slide2,
      alt: 'Central Library',
      h4:'Central Library',
      paragrafo:'Sed porttitor lectus nibh. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.',
      icon1:'bi bi-book',
      span1:'500K+ Books',
      icon2:'bi bi-wifi',
      span2:'High-Speed WiFi',
    },
    {
      titulo: 'Community',
      img: slide3,
      alt: 'Student Center',
      h4:'Student Center',
      paragrafo:'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus magna justo lacinia eget.',
      icon1:'bi bi-cup-hot',
      span1:'Food Court',
      icon2:'bi bi-controller',
      span2:'Game Lounge',
    },
    {
      titulo: 'Wellness',
      img: slide4,
      alt: 'Wellness Center',
      h4:'Wellness Center',
      paragrafo:'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus.',
      icon1:'bi bi-heart-pulse',
      span1:'Health Services',
      icon2:'bi bi-activity',
      span2:'Fitness Classes',
    },
  ]

  //const endpoint_gallery = process.env.REACT_APP_GALLERY_IMG

  const [swiperRef, setSwiperRef] = useState(null);
  const [numSlide, SetNumSlide] = useState(1);
  const [escala,setEscala] = useState(null);

  useEffect((props) => {
      const handleResize = () =>{
         const viewportWidth = window.innerWidth;
         if(viewportWidth < 700){
            SetNumSlide(1)
         } else {
            SetNumSlide(1)
         }
         //console.log('resize');
      }
      window.addEventListener('resize', handleResize)
      //console.log('carreguei o Swiper')
      document.getElementById('swpid').style='max-width:1200px !important'
      let view = window.innerWidth;
      if(view < 700){
          SetNumSlide(1)
      }
      return () => {
          window.removeEventListener("resize", handleResize);
      };

   },[])

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

  return (
    <>
      <Swiper
        id="swpid"
        onSwiper={setSwiperRef}
        slidesPerView={numSlide}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={10}
        navigation={true}
        modules={[Autoplay,Pagination, Navigation]}
        style={{maxWidth:'1380px !important'}}
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
        <SwiperSlide>Slide 4</SwiperSlide> */}
      </Swiper>
      </>
  );
}
