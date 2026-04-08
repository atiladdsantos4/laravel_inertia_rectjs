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
  CImage,
  CButton
} from '@coreui/react'
import { useStore } from '../store/useStore';

export const SectionAbout = (props) => {
   const endpoint = import.meta.env.VITE_APP_ENDPOINT_API
   const imgpath = import.meta.env.VITE_APP_ENDPOINT_IMG

   //global variable shared between
   const { aboutstore } = useStore();

   const id = "section-about"
   const [load, setLoad] = useState(false)
   const [title, setTitle] = useState(props.title)
   const [subtitle,subTitle] = useState(props.subtitle)
   const {dados, token, open } =  props
   const [titulo, setTitulo] = useState(null)
   const [subtitulo, setSubtitulo] = useState(null)
   const [textosection, setTextosection] = useState(null)
   const [pontuacao, setPontuacao] = useState(null)
   const [textorate, setTextorate] = useState(null)
   const [imgabout01, setImgabout1] = useState(null)
   const [imgabout02, setImgabout2] = useState(null)
   const [imgabout03, setImgabout3] = useState(null)

   const openModal = (event) =>{
      open()
   }


   useEffect(()=>{
      console.log('usereffect carrosel')
      if( aboutstore == 0 ){
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
      } else {
         axios
            .get(`${endpoint}/section/1?section_man=S`, {
                headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,//dentro do env//
                },
            })
            .then((result) => {
                let string =  null
                result.data.data.sec_itens.map((item, index) => {
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
            })
        }

   },[props,aboutstore])

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
                                    <div className="div-score">{textorate}</div>
                                </h4>
                            </div>
                            <div style={{padding:'2px',position:'relative',top:'30px',left:'-50px'}}>
                               <CButton
                                   onClick={(e)=>openModal(e)}
                                   variant="outline"
                                   color="secondary"
                                   className="rounded-pill"
                                   style={{border:'none',paddingTop:'1px',paddingBottom:'1px',backgroundColor:'rgba(244, 150, 209, 1)'}}
                                   size="sm">
                                        Faça Avaliação
                                </CButton>
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
