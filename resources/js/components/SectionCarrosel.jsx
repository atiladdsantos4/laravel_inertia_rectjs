import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import slide1 from '../images/header1.png';
// import slide2 from '../images/header2.png';
// import slide3 from '../images/header3.png';
// import slide4 from '../images/header4.png';
import slide1 from '../images/carrosel01.jpg';
import slide2 from '../images/carrosel02.jpg';
import slide3 from '../images/carrosel03.jpg';
import slide4 from '../images/carrosel04.jpg';
import slide5 from '../images/carrosel05.jpg';
import { DivImagem } from './DivImagem';



// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

export const SectionCarrosel = (props)=> {
  const imgpath = import.meta.env.VITE_APP_ENDPOINT_IMG
  const {dados} =  props
  const [listaimg,setListaImg] = useState([])

  useEffect(()=>{
        let string =  null
        dados.map((item,index)=>{
           switch(item.sei_nome){
           case "titulo":
              setTitulo(item.sei_valor)
              break
           case "sub-titulo":
              setSubtitulo(item.sei_valor)
              break
           case "listaimgsection":
              string =  JSON.parse(item.sei_json)
              setListaImg(string.meta)
              break
        }
        })
  },[props])
  const lista1 =[
    {
      titulo: 'Research',
      //img: slide1,
      img:null,
      cont:<DivImagem texto={false} imagem={slide1}/>
    },
    {
      titulo: 'Academic',
      //img: slide2,
      img:null,
      cont:<DivImagem texto={false} imagem={slide2}/>
    },
    {
      titulo: 'Community',
      //img: slide3,
      img:null,
      cont:<DivImagem texto={false} imagem={slide3}/>
    },
    {
      titulo: 'Wellness',
      img:null,
      //img: slide4,
      cont:<DivImagem texto={false} imagem={slide4}/>
    },
    {
      titulo: 'Wellness',
      img: null,
      cont:<DivImagem texto={true} imagem={slide5}/>
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
        {listaimg.map((item, index) => (
            <SwiperSlide  style={{backgroundColor:'white !important',textAlign:'center'}}>
                <DivImagem texto={true} imagem={imgpath+item.path+'/'+item.imagem}/>
            {/* <div class="card" style={{margin:'auto',width: '18rem'}}> */}
            {/* {
              item.img != null ? (<img src={item.img} alt="Innovation Hub" class="img-fluid" loading="lazy"/>) : (item.cont)
            } */}
                {item.cont}
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

