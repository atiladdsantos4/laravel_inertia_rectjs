import { React,useEffect, useState, Suspense } from 'react';
import imgAbout from '../images/about.png';
//import imgAbout1 from '../images/about/Imagem01.jpg';
import imgAbout1 from '../images/about/Imagem01.jpg'
import imgAbout2 from '../images/Imagem02.jpg';
import imgAbout3 from '../images/Imagem03.jpg';
import { RateComp } from '../components/RateComp';
import {
  CContainer,
  CPlaceholder,
  CRow,
  CCol,
  CImage
} from '@coreui/react'


export const SectionAbout = (props) => {
   const imgpath = import.meta.env.VITE_APP_ENDPOINT_IMG
   const id = "section-about"
   const [load, setLoad] = useState(false)
   const [title, setTitle] = useState(props.title)
   const [subtitle,subTitle] = useState(props.subtitle)
   const {dados} =  props
   const [titulo, setTitulo] = useState(null)
   const [subtitulo, setSubtitulo] = useState(null)
   const [textosection, setTextosection] = useState(null)
   const [pontuacao, setPontuacao] = useState(null)
   const [textorate, setTextorate] = useState(null)
   const [imgabout01, setImgabout1] = useState(null)
   const [imgabout02, setImgabout2] = useState(null)
   const [imgabout03, setImgabout3] = useState(null)


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
           case "textosection":
              setTextosection(item.sei_valor)
              break
           case "pontuacao":
              setPontuacao(item.sei_valor)
              break
           case "textorate":
              setTextorate(item.sei_valor)
              break
           case "imgabout1":
              string =  JSON.parse(item.sei_json)
              let img1 = imgpath + string.meta[0].path + item.sei_valor
              setImgabout1(img1)
              break
           case "imgabout2":
              string =  JSON.parse(item.sei_json)
              let img2 = imgpath + string.meta[0].path + item.sei_valor
              setImgabout2(img2)
              break
           case "imgabout3":
              string =  JSON.parse(item.sei_json)
              let img3 = imgpath + string.meta[0].path + item.sei_valor
              setImgabout3(img3)
              break
        }
      })
      setLoad(true)
   },[props])

   return(
    load ? (
    <div className="aos-animate" data-aos="fade-up" data-aos-delay="200">
        <section id={id} className="mt-5">
            <CContainer className="ms-4">
                <h1 style={{fontSize:'1.5rem'}}>{titulo}</h1>
                <h4 style={{fontSize:'2.5rem'}}>{subtitulo}</h4>
            </CContainer>
            <CContainer className="ms-2">
            <CRow>
                <CCol md="6" xs="12" className="pb-4">
                    <div data-aos="fade-right">
                        <p>{textosection}</p>
                        <div class="circle">
                            <div className="div-circle">
                                <h4>{pontuacao}
                                <div className="div-rate"><RateComp/></div>
                                <div className="div-score">
                                   {textorate}</div>
                                </h4>
                            </div>
                        </div>
                    </div>
                </CCol>
                <CCol md="6" xs="12" className='div_about'>
                    <div className="aos-animate" style={{backgroundImage:`url(${imgabout01})`}} data-aos="fade-up" data-aos-delay="200" className="image_about01"></div>
                    <div className="aos-animate" style={{backgroundImage:`url(${imgabout02})`}} data-aos="fade-down" data-aos-delay="200" className="image_about02"></div>
                    <div data-aos="fade-up" style={{backgroundImage:`url(${imgabout03})`}} data-aos-delay="200" className="image_about03"></div>
                    {/* <div data-aos="fade-left">
                       <CImage style={{top:'-20px'}} fluid src={imgAbout} />
                    </div> */}
                </CCol>
            </CRow>
            </CContainer>
        </section>
    </div>) : (<></>)
   )
}
